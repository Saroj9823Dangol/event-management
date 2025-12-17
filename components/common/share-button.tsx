// components/blogs/share-button.tsx
"use client"; // This needs to be a client component

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Share2 } from "lucide-react";
import {
  EmailIcon,
  EmailShareButton,
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  RedditIcon,
  RedditShareButton,
  TwitterIcon,
  TwitterShareButton,
} from "react-share";

interface ShareButtonProps {
  title: string;
  url: string;
  excerpt: string;
}

export function ShareButton({ title, url, excerpt }: ShareButtonProps) {
  const shareText = `${title} - ${excerpt}`;
  const iconSize = 32;
  const iconRound = false;
  const iconBgStyle = { fill: "none" };
  const iconFillColor = "currentColor";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="group flex items-center gap-3 px-8 py-4 bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white hover:text-black transition-all duration-300 rounded-lg">
          <Share2 className="w-4 h-4 mr-2" />

          <span className="text-sm font-bold tracking-widest">SHARE</span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-gray-900 border-gray-700 text-white p-2 flex flex-col gap-2">
        <div className="flex items-center gap-3 p-2 hover:bg-gray-800 rounded">
          <TwitterShareButton
            className="flex items-center"
            url={url}
            title={shareText}
          >
            <TwitterIcon
              size={iconSize}
              round={iconRound}
              bgStyle={iconBgStyle}
              iconFillColor={iconFillColor}
            />
            <span>Twitter</span>
          </TwitterShareButton>
        </div>

        <div className="flex items-center gap-3 p-2 hover:bg-gray-800 rounded">
          <FacebookShareButton
            className="flex items-center"
            url={url}
            title={shareText}
          >
            <FacebookIcon
              size={iconSize}
              round={iconRound}
              bgStyle={iconBgStyle}
              iconFillColor={iconFillColor}
            />
            <span>Facebook</span>
          </FacebookShareButton>
        </div>

        <div className="flex items-center gap-3 p-2 hover:bg-gray-800 rounded">
          <LinkedinShareButton
            className="flex items-center"
            url={url}
            title={title}
            summary={excerpt}
          >
            <LinkedinIcon
              size={iconSize}
              round={iconRound}
              bgStyle={iconBgStyle}
              iconFillColor={iconFillColor}
            />
            <span>LinkedIn</span>
          </LinkedinShareButton>
        </div>

        <div className="flex items-center gap-3 p-2 hover:bg-gray-800 rounded">
          <RedditShareButton
            className="flex items-center"
            url={url}
            title={title}
          >
            <RedditIcon
              size={iconSize}
              round={iconRound}
              bgStyle={iconBgStyle}
              iconFillColor={iconFillColor}
            />
            <span>Reddit</span>
          </RedditShareButton>
        </div>

        <div className="flex items-center gap-3 p-2 hover:bg-gray-800 rounded">
          <EmailShareButton
            className="flex items-center"
            url={url}
            subject={title}
            body={excerpt}
          >
            <EmailIcon
              size={iconSize}
              round={iconRound}
              bgStyle={iconBgStyle}
              iconFillColor={iconFillColor}
            />
            <span>Email</span>
          </EmailShareButton>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
