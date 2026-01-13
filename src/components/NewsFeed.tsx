"use client";

import { useState, useEffect, useCallback } from "react";
import { Article } from "@/types/article";

function formatRelativeTime(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMins < 60) {
    return `${diffMins}m ago`;
  } else if (diffHours < 24) {
    return `${diffHours}h ago`;
  } else if (diffDays < 7) {
    return `${diffDays}d ago`;
  }

  return date.toLocaleString("en-US", {
    timeZone: "America/Los_Angeles",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    timeZoneName: "short",
  });
}

function formatFullDate(date: Date): string {
  return date.toLocaleString("en-US", {
    timeZone: "America/Los_Angeles",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    timeZoneName: "short",
  });
}

interface ArticleItemProps {
  article: Article;
  index: number;
  isSelected: boolean;
  onSelect: () => void;
}

function ArticleItem({ article, index, isSelected, onSelect }: ArticleItemProps) {
  const staggerClass = `stagger-${Math.min((index % 5) + 1, 5)}`;

  return (
    <article
      className={`py-2.5 px-4 rounded-lg transition-colors cursor-pointer opacity-0 animate-fade-in ${staggerClass} ${
        isSelected
          ? "bg-blue-50 dark:bg-blue-950"
          : "hover:bg-gray-50 dark:hover:bg-gray-900"
      }`}
      onClick={onSelect}
      data-index={index}
    >
      <div className="text-xs text-gray-400 dark:text-gray-500 mb-1">
        {formatRelativeTime(new Date(article.pubDate))} | {article.source}
      </div>
      <a
        href={article.link}
        target="_blank"
        rel="noopener noreferrer"
        className="text-base font-medium leading-snug text-black dark:text-white hover:text-blue-700 dark:hover:text-blue-400 hover:underline"
        title={formatFullDate(new Date(article.pubDate))}
      >
        {article.title}
      </a>
    </article>
  );
}

interface NewsFeedProps {
  initialArticles: Article[];
  sources: string[];
  lastUpdated: Date | string;
}

export default function NewsFeed({ initialArticles, sources, lastUpdated }: NewsFeedProps) {
  const [articles] = useState(initialArticles);
  const [displayCount, setDisplayCount] = useState(20);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [selectedSource, setSelectedSource] = useState<string>("all");

  const filteredArticles = selectedSource === "all"
    ? articles
    : articles.filter(a => a.source === selectedSource);

  const displayedArticles = filteredArticles.slice(0, displayCount);
  const hasMore = displayCount < filteredArticles.length;

  const loadMore = useCallback(() => {
    setDisplayCount(prev => Math.min(prev + 20, filteredArticles.length));
  }, [filteredArticles.length]);

  // Keyboard navigation
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      switch (e.key) {
        case "j":
          e.preventDefault();
          setSelectedIndex(prev => Math.min(prev + 1, displayedArticles.length - 1));
          break;
        case "k":
          e.preventDefault();
          setSelectedIndex(prev => Math.max(prev - 1, 0));
          break;
        case "Enter":
          if (selectedIndex >= 0 && selectedIndex < displayedArticles.length) {
            window.open(displayedArticles[selectedIndex].link, "_blank");
          }
          break;
        case "Escape":
          setSelectedIndex(-1);
          break;
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex, displayedArticles]);

  // Scroll selected item into view
  useEffect(() => {
    if (selectedIndex >= 0) {
      const element = document.querySelector(`[data-index="${selectedIndex}"]`);
      element?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }, [selectedIndex]);

  return (
    <>
      {/* Source filter */}
      <div className="px-4 mb-4 flex flex-wrap gap-2">
        <button
          onClick={() => { setSelectedSource("all"); setDisplayCount(20); }}
          className={`text-xs px-2 py-1 rounded transition-colors ${
            selectedSource === "all"
              ? "bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900"
              : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
          }`}
        >
          All
        </button>
        {sources.map(source => (
          <button
            key={source}
            onClick={() => { setSelectedSource(source); setDisplayCount(20); }}
            className={`text-xs px-2 py-1 rounded transition-colors ${
              selectedSource === source
                ? "bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900"
                : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
            }`}
          >
            {source}
          </button>
        ))}
      </div>

      {/* Articles */}
      <div className="space-y-1">
        {displayedArticles.map((article, index) => (
          <ArticleItem
            key={`${article.link}-${index}`}
            article={article}
            index={index}
            isSelected={index === selectedIndex}
            onSelect={() => setSelectedIndex(index)}
          />
        ))}
      </div>

      {/* Load more */}
      {hasMore && (
        <div className="mt-6 text-center">
          <button
            onClick={loadMore}
            className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
          >
            Load more ({filteredArticles.length - displayCount} remaining)
          </button>
        </div>
      )}

      {/* Footer */}
      <p className="text-xs text-gray-300 dark:text-gray-600 mt-8 text-center">
        Last updated {formatFullDate(new Date(lastUpdated))}
      </p>

      {/* Keyboard hint */}
      <p className="text-xs text-gray-300 dark:text-gray-700 mt-2 text-center">
        Press <kbd className="px-1 py-0.5 bg-gray-100 dark:bg-gray-800 rounded text-[10px]">j</kbd>/<kbd className="px-1 py-0.5 bg-gray-100 dark:bg-gray-800 rounded text-[10px]">k</kbd> to navigate, <kbd className="px-1 py-0.5 bg-gray-100 dark:bg-gray-800 rounded text-[10px]">enter</kbd> to open
      </p>
    </>
  );
}
