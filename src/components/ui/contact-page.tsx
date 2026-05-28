'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import {
  Check,
  Copy,
  Mail,
  MapPin,
  Phone,
} from 'lucide-react';
import { Button, type buttonVariants } from '@/components/ui/button';
import type { VariantProps } from 'class-variance-authority';

const APP_EMAIL = 'mail@example.com';
const APP_PHONE = '+92 300 1234567';
const APP_PHONE_2 = '+92 321 9876543';
const APP_YOUTUBE = 'https://www.youtube.com/channel/UCYJxADThoDDEbhpGa6mSaGw';
const APP_INSTAGRAM = 'https://www.instagram.com/kiki_garod_studio/';

export function ContactPage() {
  const YoutubeSvg = ({ className, ...props }: { className?: string; [key: string]: unknown }) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} {...props}>
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
  const InstagramSvg = ({ className, ...props }: { className?: string; [key: string]: unknown }) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} {...props}>
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
    </svg>
  );
  const GithubSvg = ({ className, ...props }: { className?: string; [key: string]: unknown }) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} {...props}>
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  );

  const socialLinks = [
    {
      icon: YoutubeSvg,
      href: APP_YOUTUBE,
      label: 'YouTube',
    },
    {
      icon: InstagramSvg,
      href: APP_INSTAGRAM,
      label: 'Instagram',
    },
    {
      icon: GithubSvg,
      href: 'https://github.com/sshahaider',
      label: 'GitHub',
    },
  ];

  return (
    <div className="min-h-screen w-full bg-[#070707]">
      <div className="mx-auto h-full max-w-6xl lg:border-x border-white/5">
        <div
          aria-hidden
          className="absolute inset-0 isolate -z-10 opacity-80 contain-strict"
        >
          <div className="bg-[radial-gradient(68.54%_68.72%_at_55.02%_31.46%,rgba(240,232,220,0.06)_0,rgba(240,232,220,0.02)_50%,rgba(240,232,220,0.01)_80%)] absolute top-0 left-0 h-320 w-140 -translate-y-87.5 -rotate-45 rounded-full" />
          <div className="bg-[radial-gradient(50%_50%_at_50%_50%,rgba(240,232,220,0.04)_0,rgba(240,232,220,0.01)_80%,transparent_100%)] absolute top-0 left-0 h-320 w-60 [translate:5%_-50%] -rotate-45 rounded-full" />
          <div className="bg-[radial-gradient(50%_50%_at_50%_50%,rgba(240,232,220,0.04)_0,rgba(240,232,220,0.01)_80%,transparent_100%)] absolute top-0 left-0 h-320 w-60 -translate-y-87.5 -rotate-45 rounded-full" />
        </div>
        <div className="flex grow flex-col justify-center px-4 md:px-6 pt-32 pb-16">
          <h1 className="text-4xl font-bold md:text-5xl font-['Playfair_Display',serif] text-[#f0e8dc]">
            Contact Us
          </h1>
          <p className="text-[#f0e8dc]/50 mb-5 text-base">
            Get in touch with Kiki Garod Studio.
          </p>
        </div>
        <BorderSeparator />
        <div className="grid md:grid-cols-3">
          <Box
            icon={Mail}
            title="Email"
            description="We respond to all emails within 24 hours."
          >
            <a
              href={`mailto:${APP_EMAIL}`}
              className="font-mono text-base font-medium tracking-wide hover:underline text-[#f0e8dc]"
            >
              {APP_EMAIL}
            </a>
            <CopyButton className="size-6" test={APP_EMAIL} />
          </Box>
          <Box
            icon={MapPin}
            title="Office"
            description="Based in Meghalaya, India."
          >
            <span className="font-mono text-base font-medium tracking-wide text-[#f0e8dc]">
              Shillong, Meghalaya, India
            </span>
          </Box>
          <Box
            icon={Phone}
            title="Phone"
            description="Available Mon-Fri, 9am-5pm."
            className="border-b-0 md:border-r-0"
          >
            <div>
              <div className="flex items-center gap-x-2">
                <a
                  href={`tel:${APP_PHONE}`}
                  className="block font-mono text-base font-medium tracking-wide hover:underline text-[#f0e8dc]"
                >
                  {APP_PHONE}
                </a>
                <CopyButton className="size-6" test={APP_PHONE} />
              </div>
              <div className="flex items-center gap-x-2">
                <a
                  href={`tel:${APP_PHONE_2}`}
                  className="block font-mono text-base font-medium tracking-wide hover:underline text-[#f0e8dc]"
                >
                  {APP_PHONE_2}
                </a>
                <CopyButton className="size-6" test={APP_PHONE_2} />
              </div>
            </div>
          </Box>
        </div>
        <BorderSeparator />
        <div className="relative flex h-full min-h-[320px] items-center justify-center">
          <div
            className={cn(
              'z--10 absolute inset-0 size-full',
              'bg-[radial-gradient(rgba(240,232,220,0.15)_1px,transparent_1px)]',
              'bg-[size:32px_32px]',
              '[mask-image:radial-gradient(ellipse_at_center,#070707_30%,transparent)]',
            )}
          />

          <div className="relative z-1 space-y-6">
            <h2 className="text-center text-3xl font-bold md:text-4xl font-['Playfair_Display',serif] text-[#f0e8dc]">
              Find us online
            </h2>
            <div className="flex flex-wrap items-center gap-4 justify-center">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-muted/50 hover:bg-accent flex items-center gap-x-2 rounded-full border border-white/10 px-4 py-2 text-[#f0e8dc] transition-colors duration-300"
                >
                  <link.icon className="size-4" />
                  <span className="font-mono text-sm font-medium tracking-wide">
                    {link.label}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function BorderSeparator() {
  return <div className="absolute inset-x-0 h-px w-full border-b border-white/5" />;
}

type IconComponent = React.ComponentType<{ className?: string }>;

type ContactBox = React.ComponentProps<'div'> & {
  icon: IconComponent;
  title: string;
  description: string;
};

function Box({
  title,
  description,
  className,
  children,
  ...props
}: ContactBox) {
  return (
    <div
      className={cn(
        'flex flex-col justify-between border-b md:border-r md:border-b-0 border-white/5',
        className,
      )}
    >
      <div className="bg-muted/40 flex items-center gap-x-3 border-b border-white/5 p-4">
        <props.icon className="text-[#f0e8dc]/50 size-5" />
        <h2 className="font-['Playfair_Display',serif] text-lg font-medium tracking-wider text-[#f0e8dc]">
          {title}
        </h2>
      </div>
      <div className="flex items-center gap-x-2 p-4 py-12">{children}</div>
      <div className="border-t border-white/5 p-4">
        <p className="text-[#f0e8dc]/50 text-sm">{description}</p>
      </div>
    </div>
  );
}

type CopyButtonProps = VariantProps<typeof buttonVariants> & {
  className?: string;
  test: string;
};

function CopyButton({
  className,
  variant = 'ghost',
  size = 'icon',
  test,
  ...props
}: CopyButtonProps) {
  const [copied, setCopied] = React.useState<boolean>(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(test);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <Button
      variant={variant}
      size={size}
      className={cn('disabled:opacity-100', className)}
      onClick={handleCopy}
      aria-label={copied ? 'Copied' : 'Copy to clipboard'}
      disabled={copied || undefined}
      {...props}
    >
      <div
        className={cn(
          'transition-all',
          copied ? 'scale-100 opacity-100' : 'scale-0 opacity-0',
        )}
      >
        <Check className="size-3.5 text-emerald-500" aria-hidden="true" />
      </div>
      <div
        className={cn(
          'absolute transition-all',
          copied ? 'scale-0 opacity-0' : 'scale-100 opacity-100',
        )}
      >
        <Copy aria-hidden="true" className="size-3.5 text-[#f0e8dc]/70" />
      </div>
    </Button>
  );
}
