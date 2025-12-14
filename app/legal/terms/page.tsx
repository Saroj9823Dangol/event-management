"use client";

import { CinematicNav } from "@/components/cinematic-nav";
import { SiteFooter } from "@/components/site-footer";
import { BackgroundPattern } from "@/components/background-pattern";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background relative selection:bg-accent selection:text-white">
      <BackgroundPattern />
      <CinematicNav />

      <main className="pt-32 pb-24 px-6 lg:px-12">
        <div className="max-w-4xl mx-auto">
          <header className="mb-16">
            <h1 className="text-4xl md:text-6xl font-serif mb-6">
              Terms of Service
            </h1>
            <p className="text-white/60">Last updated: December 14, 2025</p>
          </header>

          <div className="prose prose-invert prose-lg max-w-none prose-headings:font-serif prose-a:text-accent font-light">
            <p>
              These Terms of Service constitute a legally binding agreement made
              between you, whether personally or on behalf of an entity (“you”)
              and EventSphere (“we,” “us” or “our”), concerning your access to
              and use of the EventSphere website as well as any other media
              form, media channel, mobile website or mobile application related,
              linked, or otherwise connected thereto.
            </p>

            <h3>1. Agreement to Terms</h3>
            <p>
              By accessing the Site, you agree that you have read, understood,
              and agree to be bound by all of these Terms of Use. If you do not
              agree with all of these terms of use, then you are expressly
              prohibited from using the site and you must discontinue use
              immediately.
            </p>

            <h3>2. Intellectual Property Rights</h3>
            <p>
              Unless otherwise indicated, the Site is our proprietary property
              and all source code, databases, functionality, software, website
              designs, audio, video, text, photographs, and graphics on the Site
              (collectively, the “Content”) and the trademarks, service marks,
              and logos contained therein (the “Marks”) are owned or controlled
              by us or licensed to us, and are protected by copyright and
              trademark laws and various other intellectual property rights.
            </p>

            <h3>3. User Representations</h3>
            <p>By using the Site, you represent and warrant that:</p>
            <ul>
              <li>
                All registration information you submit will be true, accurate,
                current, and complete.
              </li>
              <li>
                You will maintain the accuracy of such information and promptly
                update such registration information as necessary.
              </li>
              <li>
                You have the legal capacity and you agree to comply with these
                Terms of Use.
              </li>
              <li>
                You are not a minor in the jurisdiction in which you reside.
              </li>
            </ul>

            <h3>4. Ticket Purchases</h3>
            <p>
              All ticket purchases are final and non-refundable except as
              expressly set forth in our Refund Policy. EventSphere acts as an
              agent for those who are promoting or otherwise providing the
              events for which you purchase tickets ("Event Organizers"). We do
              not set the ticket prices or determine seating locations.
            </p>

            <h3>5. Contact Us</h3>
            <p>
              In order to resolve a complaint regarding the Site or to receive
              further information regarding use of the Site, please contact us
              at:
              <br />
              <br />
              <strong>EventSphere</strong>
              <br />
              123 Event Horizon Blvd
              <br />
              Los Angeles, CA 90012
              <br />
              hello@eventsphere.com
            </p>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
