'use client';

import {
  ChangeEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import Link from 'next/link';
import {
  CalendarDays,
  Camera,
  Flame,
  ImagePlus,
  Loader2,
  MapPin,
  Medal,
  MessageCircle,
  RefreshCw,
  Send,
  Sparkles,
  Trophy,
  Users,
  X,
} from 'lucide-react';
import toast from 'react-hot-toast';

import { createClient } from '@/lib/supabase/client';

type FeedRow = {
  post_id: string;
  user_id: string;
  full_name: string;
  community_location: string | null;
  avatar_path: string | null;
  total_xp: number;
  body: string;
  image_path: string | null;
  created_at: string;
};

type FeedPost = FeedRow & {
  avatar_url: string | null;
  image_url: string | null;
};

type LeaderboardRow = {
  user_id: string;
  full_name: string;
  community_location: string | null;
  avatar_path: string | null;
  total_xp: number;
  current_streak: number;
};

type LeaderboardItem = LeaderboardRow & {
  avatar_url: string | null;
};

type EventRow = {
  event_id: string;
  title: string;
  description: string | null;
  event_date: string | null;
  location: string | null;
  image_path: string | null;
  created_at: string;
};

type CommunityEvent = EventRow & {
  image_url: string | null;
};

type Allowance = {
  limit: number;
  used: number;
  remaining: number;
};

const MAX_POST_LENGTH = 500;
const MAX_IMAGE_BYTES = 5 * 1024 * 1024;

function initials(name: string) {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('') || 'HA';
}

function timeAgo(dateString: string) {
  const date = new Date(dateString);
  const seconds = Math.max(
    0,
    Math.floor((Date.now() - date.getTime()) / 1000),
  );

  if (seconds < 60) return 'Just now';

  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;

  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;

  return date.toLocaleDateString();
}

function formatEventDate(value: string | null) {
  if (!value) return null;

  return new Date(`${value}T12:00:00`).toLocaleDateString(undefined, {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

function Avatar({
  name,
  url,
  size = 'md',
}: {
  name: string;
  url: string | null;
  size?: 'sm' | 'md' | 'lg';
}) {
  const sizeClass =
    size === 'lg'
      ? 'h-12 w-12 text-sm'
      : size === 'sm'
        ? 'h-8 w-8 text-[10px]'
        : 'h-10 w-10 text-xs';

  if (url) {
    return (
      <img
        src={url}
        alt=""
        className={`${sizeClass} shrink-0 rounded-full object-cover ring-1 ring-white/15`}
      />
    );
  }

  return (
    <div
      className={`${sizeClass} flex shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-emerald-500 font-bold text-emerald-950 ring-1 ring-white/15`}
      aria-hidden="true"
    >
      {initials(name)}
    </div>
  );
}

export default function CommunityPage() {
  const supabase = useMemo(() => createClient(), []);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [userId, setUserId] = useState<string | null>(null);
  const [posts, setPosts] = useState<FeedPost[]>([]);
  const [leaderboard, setLeaderboard] = useState<LeaderboardItem[]>([]);
  const [events, setEvents] = useState<CommunityEvent[]>([]);
  const [allowance, setAllowance] = useState<Allowance>({
    limit: 3,
    used: 0,
    remaining: 3,
  });

  const [message, setMessage] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [posting, setPosting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const signPath = useCallback(
    async (bucket: string, path: string | null) => {
      if (!path) return null;

      const { data, error: signError } = await supabase.storage
        .from(bucket)
        .createSignedUrl(path, 60 * 60);

      if (signError) return null;
      return data.signedUrl;
    },
    [supabase],
  );

  const loadCommunity = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError) throw userError;
      if (!user) throw new Error('Please sign in to open the community.');

      setUserId(user.id);

      const [feedResult, leadersResult, eventsResult, allowanceResult] =
        await Promise.all([
          supabase.rpc('get_community_feed', { p_limit: 30 }),
          supabase.rpc('get_community_leaderboard', { p_limit: 10 }),
          supabase.rpc('get_community_events', { p_limit: 12 }),
          supabase.rpc('get_community_post_allowance'),
        ]);

      if (feedResult.error) throw feedResult.error;
      if (leadersResult.error) throw leadersResult.error;
      if (eventsResult.error) throw eventsResult.error;
      if (allowanceResult.error) throw allowanceResult.error;

      const feedRows = (feedResult.data ?? []) as FeedRow[];
      const leaderRows = (leadersResult.data ?? []) as LeaderboardRow[];
      const eventRows = (eventsResult.data ?? []) as EventRow[];

      const hydratedPosts = await Promise.all(
        feedRows.map(async (post) => ({
          ...post,
          avatar_url: await signPath('avatars', post.avatar_path),
          image_url: await signPath('community-media', post.image_path),
        })),
      );

      const hydratedLeaders = await Promise.all(
        leaderRows.map(async (leader) => ({
          ...leader,
          avatar_url: await signPath('avatars', leader.avatar_path),
        })),
      );

      const hydratedEvents = await Promise.all(
        eventRows.map(async (event) => ({
          ...event,
          image_url: await signPath('community-media', event.image_path),
        })),
      );

      setPosts(hydratedPosts);
      setLeaderboard(hydratedLeaders);
      setEvents(hydratedEvents);

      const allowanceData = allowanceResult.data as Allowance | null;
      if (allowanceData) {
        setAllowance({
          limit: Number(allowanceData.limit ?? 3),
          used: Number(allowanceData.used ?? 0),
          remaining: Number(allowanceData.remaining ?? 0),
        });
      }
    } catch (caughtError) {
      console.error('Community loading error:', caughtError);
      setError(
        caughtError instanceof Error
          ? caughtError.message
          : 'Could not load the community.',
      );
    } finally {
      setLoading(false);
    }
  }, [signPath, supabase]);

  useEffect(() => {
    void loadCommunity();
  }, [loadCommunity]);

  useEffect(() => {
    return () => {
      if (imagePreview) URL.revokeObjectURL(imagePreview);
    };
  }, [imagePreview]);

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null;

    if (!file) return;

    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
      toast.error('Use a JPG, PNG or WebP image.');
      event.target.value = '';
      return;
    }

    if (file.size > MAX_IMAGE_BYTES) {
      toast.error('Community images must be 5 MB or smaller.');
      event.target.value = '';
      return;
    }

    if (imagePreview) URL.revokeObjectURL(imagePreview);

    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const removeSelectedImage = () => {
    if (imagePreview) URL.revokeObjectURL(imagePreview);
    setImageFile(null);
    setImagePreview(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const submitPost = async () => {
    const cleanMessage = message.trim();

    if (!userId) {
      toast.error('Please sign in again.');
      return;
    }

    if (!cleanMessage) {
      toast.error('Write a message before posting.');
      return;
    }

    if (cleanMessage.length > MAX_POST_LENGTH) {
      toast.error(`Keep your post under ${MAX_POST_LENGTH} characters.`);
      return;
    }

    if (allowance.remaining <= 0) {
      toast.error('You have reached today’s 3-post limit.');
      return;
    }

    setPosting(true);

    let uploadedPath: string | null = null;

    try {
      if (imageFile) {
        const extension =
          imageFile.name.split('.').pop()?.toLowerCase() ||
          (imageFile.type === 'image/png'
            ? 'png'
            : imageFile.type === 'image/webp'
              ? 'webp'
              : 'jpg');

        uploadedPath = `community-posts/${userId}/${Date.now()}-${crypto.randomUUID()}.${extension}`;

        const { error: uploadError } = await supabase.storage
          .from('community-media')
          .upload(uploadedPath, imageFile, {
            contentType: imageFile.type,
            upsert: false,
          });

        if (uploadError) throw uploadError;
      }

      const { error: postError } = await supabase.rpc(
        'create_community_post',
        {
          p_body: cleanMessage,
          p_image_path: uploadedPath,
        },
      );

      if (postError) throw postError;

      toast.success('Posted to the HausaArabia community.');
      setMessage('');
      removeSelectedImage();
      await loadCommunity();
    } catch (caughtError) {
      console.error('Community post error:', caughtError);

      if (uploadedPath) {
        await supabase.storage
          .from('community-media')
          .remove([uploadedPath]);
      }

      toast.error(
        caughtError instanceof Error
          ? caughtError.message
          : 'Could not publish your post.',
      );
    } finally {
      setPosting(false);
    }
  };

  const canPost =
    message.trim().length > 0 &&
    message.length <= MAX_POST_LENGTH &&
    allowance.remaining > 0 &&
    !posting;

  if (loading) {
    return (
      <div className="flex min-h-[65vh] items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="h-9 w-9 animate-spin text-amber-400" />
          <p className="text-sm text-white/45">
            Opening the HausaArabia community...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="max-w-md rounded-2xl border border-white/10 bg-white/5 p-8 text-center">
          <Users className="mx-auto h-9 w-9 text-amber-400" />
          <h1 className="mt-4 text-xl font-bold text-white">
            Community could not be loaded
          </h1>
          <p className="mt-2 text-sm text-white/50">{error}</p>
          <button
            type="button"
            onClick={() => void loadCommunity()}
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-500"
          >
            <RefreshCw className="h-4 w-4" />
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-7 pb-12">
      {/* Hero */}
      <section className="relative min-h-[360px] overflow-hidden rounded-3xl border border-white/10 bg-emerald-950 shadow-2xl md:min-h-[430px]">
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src="/community-hero.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-emerald-950 via-emerald-950/75 to-emerald-950/15" />
        <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-transparent to-emerald-950/10" />

        <div className="relative z-10 flex min-h-[360px] max-w-2xl flex-col justify-end p-6 sm:p-8 md:min-h-[430px] md:p-10">
          <div className="mb-4 inline-flex w-fit items-center gap-2 rounded-full bg-amber-400/15 px-3 py-1.5 text-xs font-semibold text-amber-300 ring-1 ring-amber-300/20 backdrop-blur-sm">
            <Users className="h-3.5 w-3.5" />
            HausaArabia Community
          </div>

          <h1 className="text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl">
            One community.
            <span className="block text-amber-300">
              Many journeys to Arabic.
            </span>
          </h1>

          <p className="mt-4 max-w-xl text-sm leading-6 text-white/70 sm:text-base">
            Share your progress, encourage another learner, celebrate the
            people building bridges between Hausa and Arabic, and grow
            together.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3 text-xs text-white/55">
            <span className="inline-flex items-center gap-1.5">
              <MessageCircle className="h-4 w-4 text-amber-300" />
              Share progress
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Trophy className="h-4 w-4 text-emerald-300" />
              Real XP leaderboard
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Camera className="h-4 w-4 text-sky-300" />
              Community moments
            </span>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
        <div className="space-y-5">
          {/* Composer */}
          <section className="rounded-2xl border border-white/10 bg-white/[0.06] p-5 backdrop-blur-sm">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-amber-400" />
              <div>
                <h2 className="font-bold text-white">Share your journey</h2>
                <p className="text-xs text-white/40">
                  {allowance.remaining} of {allowance.limit} posts remaining
                  today
                </p>
              </div>
            </div>

            <div className="mt-4 rounded-2xl border border-white/10 bg-emerald-950/20 p-3">
              <textarea
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                maxLength={MAX_POST_LENGTH}
                rows={4}
                placeholder="What did you learn today? Share a milestone, encouragement, or useful tip..."
                className="w-full resize-none bg-transparent text-sm leading-6 text-white outline-none placeholder:text-white/30"
              />

              {imagePreview && (
                <div className="relative mt-3 overflow-hidden rounded-xl">
                  <img
                    src={imagePreview}
                    alt="Selected community post"
                    className="max-h-80 w-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={removeSelectedImage}
                    aria-label="Remove selected image"
                    className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-emerald-950/80 text-white backdrop-blur-sm transition hover:bg-emerald-950"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              )}

              <div className="mt-3 flex items-center justify-between gap-3 border-t border-white/10 pt-3">
                <div className="flex items-center gap-2">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    onChange={handleImageChange}
                    className="hidden"
                  />

                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={posting}
                    className="inline-flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-semibold text-white/60 transition hover:bg-white/10 hover:text-white disabled:opacity-40"
                  >
                    <ImagePlus className="h-4 w-4 text-emerald-300" />
                    Add photo
                  </button>

                  <span className="hidden text-[11px] text-white/25 sm:inline">
                    JPG, PNG or WebP · max 5 MB
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <span
                    className={`text-[11px] ${
                      message.length >= 450
                        ? 'text-amber-300'
                        : 'text-white/30'
                    }`}
                  >
                    {message.length}/{MAX_POST_LENGTH}
                  </span>

                  <button
                    type="button"
                    onClick={() => void submitPost()}
                    disabled={!canPost}
                    className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2 text-xs font-bold text-white transition hover:bg-emerald-500 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    {posting ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Send className="h-4 w-4" />
                    )}
                    Post
                  </button>
                </div>
              </div>
            </div>

            <p className="mt-3 text-[11px] leading-5 text-white/30">
              Community posts do not award XP. The leaderboard reflects your
              real learning progress only.
            </p>
          </section>

          {/* Feed */}
          <section>
            <div className="mb-3 flex items-center justify-between">
              <div>
                <h2 className="font-bold text-white">Community board</h2>
                <p className="mt-0.5 text-xs text-white/35">
                  Progress, encouragement and useful learning moments
                </p>
              </div>

              <button
                type="button"
                onClick={() => void loadCommunity()}
                className="flex h-9 w-9 items-center justify-center rounded-full text-white/40 transition hover:bg-white/10 hover:text-white"
                aria-label="Refresh community"
                title="Refresh"
              >
                <RefreshCw className="h-4 w-4" />
              </button>
            </div>

            {posts.length > 0 ? (
              <div className="space-y-3">
                {posts.map((post) => (
                  <article
                    key={post.post_id}
                    className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.06]"
                  >
                    <div className="p-5">
                      <div className="flex items-start gap-3">
                        <Avatar
                          name={post.full_name}
                          url={post.avatar_url}
                          size="md"
                        />

                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                            <p className="truncate text-sm font-bold text-white">
                              {post.full_name}
                            </p>
                            <span className="text-[11px] font-semibold text-amber-400">
                              {post.total_xp.toLocaleString()} XP
                            </span>
                          </div>

                          <div className="mt-0.5 flex flex-wrap items-center gap-2 text-[11px] text-white/35">
                            {post.community_location && (
                              <span className="inline-flex items-center gap-1">
                                <MapPin className="h-3 w-3" />
                                {post.community_location}
                              </span>
                            )}
                            <span>{timeAgo(post.created_at)}</span>
                          </div>
                        </div>
                      </div>

                      <p className="mt-4 whitespace-pre-wrap text-sm leading-6 text-white/75">
                        {post.body}
                      </p>
                    </div>

                    {post.image_url && (
                      <img
                        src={post.image_url}
                        alt="Community post"
                        className="max-h-[520px] w-full object-cover"
                      />
                    )}
                  </article>
                ))}
              </div>
            ) : (
              <div className="rounded-2xl border border-dashed border-white/10 bg-white/[0.04] p-8 text-center">
                <MessageCircle className="mx-auto h-8 w-8 text-white/25" />
                <h3 className="mt-3 font-semibold text-white">
                  Start the conversation
                </h3>
                <p className="mx-auto mt-1 max-w-sm text-sm leading-6 text-white/40">
                  There are no community posts yet. Share your learning
                  progress and become the first voice on the board.
                </p>
              </div>
            )}
          </section>
        </div>

        {/* Right column */}
        <aside className="space-y-5">
          <section className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.06]">
            <div className="border-b border-white/10 p-5">
              <div className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-amber-400" />
                <div>
                  <h2 className="font-bold text-white">XP Leaderboard</h2>
                  <p className="text-xs text-white/35">
                    Real learning XP
                  </p>
                </div>
              </div>
            </div>

            {leaderboard.length > 0 ? (
              <div className="divide-y divide-white/5">
                {leaderboard.map((learner, index) => (
                  <div
                    key={learner.user_id}
                    className="flex items-center gap-3 px-4 py-3.5"
                  >
                    <div className="flex w-6 shrink-0 justify-center">
                      {index < 3 ? (
                        <Medal
                          className={`h-5 w-5 ${
                            index === 0
                              ? 'text-amber-300'
                              : index === 1
                                ? 'text-slate-300'
                                : 'text-orange-300'
                          }`}
                        />
                      ) : (
                        <span className="text-xs font-bold text-white/30">
                          {index + 1}
                        </span>
                      )}
                    </div>

                    <Avatar
                      name={learner.full_name}
                      url={learner.avatar_url}
                      size="sm"
                    />

                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-white">
                        {learner.full_name}
                      </p>
                      <p className="truncate text-[11px] text-white/35">
                        {learner.community_location || 'Location not shared'}
                      </p>
                    </div>

                    <div className="shrink-0 text-right">
                      <p className="text-xs font-bold text-amber-400">
                        {learner.total_xp.toLocaleString()} XP
                      </p>
                      {learner.current_streak > 0 && (
                        <p className="mt-0.5 inline-flex items-center gap-1 text-[10px] text-orange-300/70">
                          <Flame className="h-3 w-3" />
                          {learner.current_streak}d
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="p-5 text-sm text-white/40">
                The leaderboard will appear as learners earn XP.
              </p>
            )}
          </section>

          <section className="rounded-2xl border border-amber-300/15 bg-gradient-to-br from-amber-400/10 to-emerald-400/[0.06] p-5">
            <Users className="h-5 w-5 text-amber-300" />
            <h2 className="mt-3 font-bold text-white">
              A community with purpose
            </h2>
            <p className="mt-2 text-sm leading-6 text-white/50">
              HausaArabia brings together students, professionals, workers,
              traders and families across Hausa- and Arabic-speaking
              communities.
            </p>
            <Link
              href="/dashboard/profile"
              className="mt-4 inline-flex text-xs font-semibold text-amber-300 transition hover:text-amber-200"
            >
              Add your community location in your profile →
            </Link>
          </section>
        </aside>
      </div>

      {/* Admin events */}
      <section>
        <div className="mb-4 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-400/65">
              HausaArabia in the community
            </p>
            <h2 className="mt-1 text-xl font-bold text-white">
              Events & moments
            </h2>
          </div>
        </div>

        {events.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {events.map((event) => (
              <article
                key={event.event_id}
                className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.06]"
              >
                {event.image_url ? (
                  <img
                    src={event.image_url}
                    alt={event.title}
                    className="aspect-[16/10] w-full object-cover"
                  />
                ) : (
                  <div className="flex aspect-[16/10] items-center justify-center bg-emerald-900/40">
                    <Camera className="h-9 w-9 text-white/20" />
                  </div>
                )}

                <div className="p-5">
                  <h3 className="font-bold text-white">{event.title}</h3>

                  <div className="mt-2 flex flex-wrap gap-3 text-[11px] text-white/40">
                    {event.event_date && (
                      <span className="inline-flex items-center gap-1">
                        <CalendarDays className="h-3.5 w-3.5 text-amber-400" />
                        {formatEventDate(event.event_date)}
                      </span>
                    )}

                    {event.location && (
                      <span className="inline-flex items-center gap-1">
                        <MapPin className="h-3.5 w-3.5 text-emerald-300" />
                        {event.location}
                      </span>
                    )}
                  </div>

                  {event.description && (
                    <p className="mt-3 line-clamp-3 text-sm leading-6 text-white/50">
                      {event.description}
                    </p>
                  )}
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-white/10 bg-white/[0.04] p-7 text-center">
            <Camera className="mx-auto h-8 w-8 text-white/20" />
            <p className="mt-3 text-sm font-semibold text-white/70">
              Event stories will appear here
            </p>
            <p className="mt-1 text-xs text-white/35">
              Admin-published HausaArabia activities and community moments.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
