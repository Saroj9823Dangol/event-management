"use client";

import { CinematicNav } from "@/components/cinematic-nav";
import { SiteFooter } from "@/components/site-footer";
import { BackgroundPattern } from "@/components/background-pattern";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background relative selection:bg-accent selection:text-white">
      <BackgroundPattern />
      <CinematicNav />

      <main className="pt-32 pb-24 px-6 lg:px-12">
        <div className="max-w-4xl mx-auto">
          <header className="mb-16">
            <h1 className="text-4xl md:text-6xl font-serif mb-6">
              Privacy Policy
            </h1>
            <p className="text-white/60">Last updated: December 14, 2025</p>
          </header>

          <div className="prose prose-invert prose-lg max-w-none prose-headings:font-serif prose-a:text-accent font-light">
            <p>
              At EventSphere, we take your privacy seriously. This Privacy
              Policy explains how we collect, use, disclosure, and safeguard
              your information when you visit our website including any other
              media form, media channel, mobile website, or mobile application
              related or connected thereto.
            </p>

            <h3>1. Collection of Your Information</h3>
            <p>
              We may collect information about you in a variety of ways. The
              information we may collect on the Site includes:
            </p>
            <ul>
              <li>
                <strong>Personal Data:</strong> Personally identifiable
                information, such as your name, shipping address, email address,
                and telephone number.
              </li>
              <li>
                <strong>Derivative Data:</strong> Information our servers
                automatically collect when you access the Site, such as your IP
                address, your browser type, your operating system, your access
                times, and the pages you have viewed directly before and after
                accessing the Site.
              </li>
              <li>
                <strong>Financial Data:</strong> Financial information, such as
                data related to your payment method (e.g., valid credit card
                number, card brand, expiration date) that we may collect when
                you purchase, order, return, exchange, or request information
                about our services from the Site.
              </li>
            </ul>

            <h3>2. Use of Your Information</h3>
            <p>
              Having accurate information about you permits us to provide you
              with a smooth, efficient, and customized experience. Specifically,
              we may use information collected about you via the Site to:
            </p>
            <ul>
              <li>Process payments and refunds.</li>
              <li>Send you a newsletter.</li>
              <li>Email you regarding your account or order.</li>
              <li>
                Fulfill and manage purchases, orders, payments, and other
                transactions related to the Site.
              </li>
              <li>
                Generate a personal profile about you to make future visits to
                the Site more personalized.
              </li>
            </ul>

            <h3>3. Security of Your Information</h3>
            <p>
              We use administrative, technical, and physical security measures
              to help protect your personal information. While we have taken
              reasonable steps to secure the personal information you provide to
              us, please be aware that despite our efforts, no security measures
              are perfect or impenetrable, and no method of data transmission
              can be guaranteed against any interception or other type of
              misuse.
            </p>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
