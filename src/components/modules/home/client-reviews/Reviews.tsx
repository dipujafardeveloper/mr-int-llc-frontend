"use client";

import Container from "@/components/container/Container";
import PageSectionTitle from "@/components/shared/section/PageSectionTitle";
import { Star } from "lucide-react";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

const reviews = [
  {
    name: "Wade Warren",
    role: "Legacy Integration Producer",
    initials: "WW",
    avatarColor: "bg-[#d8b7a0]",
    review:
      "If you want real marketing that works and effective implementation - mobile app's got you covered.",
  },
  {
    name: "Darlene Robertson",
    role: "Legacy Integration Producer",
    initials: "DR",
    avatarColor: "bg-[#d4c5b0]",
    review:
      "A fantastic shopping experience with excellent products and reliable delivery every time.",
  },
  {
    name: "Stephen Brekke",
    role: "Legacy Integration Producer",
    initials: "SB",
    avatarColor: "bg-[#b6c2a1]",
    review:
      "If you want real marketing that works and effective implementation - mobile app's got you covered.",
  },
  {
    name: "Esther Howard",
    role: "Business Owner",
    initials: "EH",
    avatarColor: "bg-[#c6a8a0]",
    review:
      "The wholesale selection and support team have made it easy to grow our business.",
  },
  {
    name: "Robert Fox",
    role: "Verified Customer",
    initials: "RF",
    avatarColor: "bg-[#a9bac0]",
    review:
      "Great value, quality products, and a smooth ordering process from start to finish.",
  },
];

export default function Reviews() {
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(2);
  const activeIndexRef = useRef(2);

  const snapToReview = useCallback(
    (index: number, behavior: ScrollBehavior = "smooth") => {
      const viewport = viewportRef.current;
      const boundedIndex = Math.max(0, Math.min(reviews.length - 1, index));
      const slide = trackRef.current?.children.item(boundedIndex) as
        | HTMLElement
        | null;
      if (!viewport || !slide) return;

      const viewportLeft = viewport.getBoundingClientRect().left;
      const slideBounds = slide.getBoundingClientRect();
      const targetLeft =
        viewport.scrollLeft +
        slideBounds.left -
        viewportLeft +
        slideBounds.width / 2 -
        viewport.clientWidth / 2;
      viewport.scrollTo({ left: targetLeft, behavior });
      activeIndexRef.current = boundedIndex;
      setActiveIndex(boundedIndex);
    },
    [],
  );

  useEffect(() => {
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!viewport || !track) return;

    const updateSlideSizes = () => {
      const cardWidth =
        viewport.clientWidth *
        (window.matchMedia("(min-width: 768px)").matches ? 0.44 : 0.76);
      const sidePadding = (viewport.clientWidth - cardWidth) / 2;
      track.style.setProperty("--review-slide-width", `${cardWidth}px`);
      track.style.paddingInline = `${sidePadding}px`;
      snapToReview(activeIndexRef.current, "instant");
    };

    const handleScroll = () => {
      const viewportCenter = viewport.scrollLeft + viewport.clientWidth / 2;
      const viewportLeft = viewport.getBoundingClientRect().left;
      const nearestIndex = Array.from(track.children)
        .slice(0, reviews.length)
        .reduce(
          (closestIndex, child, index) => {
            const slide = child as HTMLElement;
            const closestSlide = track.children.item(
              closestIndex,
            ) as HTMLElement;
            const slideBounds = slide.getBoundingClientRect();
            const closestBounds = closestSlide.getBoundingClientRect();
            const slideCenter =
              slideBounds.left -
              viewportLeft +
              viewport.scrollLeft +
              slideBounds.width / 2;
            const closestCenter =
              closestBounds.left -
              viewportLeft +
              viewport.scrollLeft +
              closestBounds.width / 2;

            return Math.abs(slideCenter - viewportCenter) <
              Math.abs(closestCenter - viewportCenter)
              ? index
              : closestIndex;
          },
          0,
        );

      if (nearestIndex !== activeIndexRef.current) {
        activeIndexRef.current = nearestIndex;
        setActiveIndex(nearestIndex);
      }
    };

    updateSlideSizes();
    viewport.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", updateSlideSizes);
    const resizeObserver = new ResizeObserver(updateSlideSizes);
    resizeObserver.observe(viewport);

    return () => {
      viewport.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", updateSlideSizes);
      resizeObserver.disconnect();
    };
  }, [snapToReview]);

  return (
    <section aria-label="Customer reviews">
      <Container>
        <PageSectionTitle
          title="Hear From Our Users"
          subTitle="Real stories from customers who shop with us."
        />

        <div className="mt-8 sm:mt-10">
          <div
            ref={viewportRef}
            className="overflow-x-auto overflow-y-hidden snap-x snap-mandatory"
            style={{ scrollbarWidth: "none" }}
            role="region"
            aria-label="Customer review carousel"
            aria-roledescription="carousel"
          >
            <div
              ref={trackRef}
              className="flex w-max min-w-full items-center"
            >
              {reviews.map((review, index) => {
                const isActive = index === activeIndex;

                return (
                  <article
                    key={review.name}
                    className={`flex h-62.5 w-[var(--review-slide-width)] shrink-0 snap-center items-center justify-center py-4 transition-[transform,opacity] duration-300 sm:h-57.5 ${
                      isActive
                        ? "z-10 scale-100 opacity-100"
                        : "scale-[0.82] opacity-55"
                    }`}
                    role="group"
                    aria-roledescription="slide"
                    aria-label={`${index + 1} of ${reviews.length}`}
                    aria-current={isActive ? "true" : undefined}
                  >
                    <div
                      className={`relative flex w-full flex-col justify-between rounded-2xl border border-[#f0e8df] bg-white px-5 pb-5 pt-8 shadow-[0_18px_50px_rgba(126,73,35,0.12)] transition-[height,box-shadow] duration-300 sm:px-6 ${
                        isActive
                          ? "h-[204px] sm:h-[190px] sm:shadow-[0_24px_60px_rgba(126,73,35,0.18)]"
                          : "h-[174px] sm:h-[150px]"
                      }`}
                    >
                      {isActive && (
                        <span
                          aria-hidden="true"
                          className="absolute -top-5 left-5 flex size-10 items-center justify-center rounded-full bg-[#f4e7d4] text-3xl font-bold leading-none text-[#984a17]"
                        >
                          “
                        </span>
                      )}

                      <p
                        className={`line-clamp-3 text-[13px] leading-[1.4] text-[#242424] sm:text-sm ${
                          isActive ? "" : "text-slate-500"
                        }`}
                      >
                        {review.review}
                      </p>

                      <div className="flex items-center justify-between gap-3">
                        <div className="flex min-w-0 items-center gap-2.5">
                          <span
                            aria-hidden="true"
                            className={`flex size-9 shrink-0 items-center justify-center rounded-full text-[11px] font-semibold text-white ${review.avatarColor}`}
                          >
                            {review.initials}
                          </span>
                          <div className="min-w-0">
                            <p className="truncate text-xs font-bold text-[#222] sm:text-sm">
                              {review.name}
                            </p>
                            <p className="truncate text-[9px] leading-tight text-[#999] sm:text-[10px]">
                              {review.role}
                            </p>
                          </div>
                        </div>
                        <div
                          role="img"
                          aria-label="5 out of 5 stars"
                          className="flex shrink-0 gap-0.5 text-amber-400"
                        >
                          {Array.from({ length: 5 }, (_, starIndex) => (
                            <Star
                              key={starIndex}
                              aria-hidden="true"
                              className="size-3.5 sm:size-4"
                              fill="currentColor"
                              strokeWidth={1.5}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>

          <div className="mt-3 flex justify-center gap-1.5" aria-label="Choose a review">
            {reviews.map((review, index) => (
              <button
                key={review.name}
                type="button"
                onClick={() => snapToReview(index, "instant")}
                aria-label={`Show review ${index + 1}`}
                aria-current={activeIndex === index ? "true" : undefined}
                className={`size-2.5 rounded-full transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#984a17] ${
                  activeIndex === index ? "bg-[#984a17]" : "bg-[#e5e2df]"
                }`}
              />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
