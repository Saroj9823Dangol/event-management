"use client";

import { CinematicNav } from "@/components/cinematic-nav";
import { SiteFooter } from "@/components/site-footer";
import { BackgroundPattern } from "@/components/background-pattern";

export default function RefundPolicyPage() {
  return (
    <div className="min-h-screen bg-background relative selection:bg-accent selection:text-white">
      <CinematicNav />

      <main className="pt-32 pb-24 px-6 lg:px-12">
        <div className="max-w-4xl mx-auto">
          <header className="mb-16">
            <h1 className="text-4xl md:text-6xl font-serif mb-6">
              Refund Policy
            </h1>
            <p className="text-white/60">Last updated: December 14, 2025</p>
          </header>

          <div className="prose prose-invert prose-lg max-w-none prose-headings:font-serif prose-a:text-accent font-light">
            <p>
              At UCNCEE, we strive to provide a seamless experience for all our
              attendees. This Refund Policy explains the circumstances under
              which refunds may be issued for ticket purchases made through our
              platform.
            </p>

            <h3>1. General Policy</h3>
            <p>
              All ticket sales are final. Unless otherwise stated in this
              policy, tickets cannot be exchanged, cancelled, or refunded after
              purchase. By completing your purchase, you acknowledge and agree
              to these terms.
            </p>

            <h3>2. Event Cancellations</h3>
            <p>
              If an event is cancelled in its entirety and not rescheduled, a
              refund will be automatically issued to the original payment method
              used at the time of purchase. This refund typically includes the
              face value of the ticket; however, certain service fees and
              processing charges may be non-refundable.
            </p>

            <h3>3. Postponed or Rescheduled Events</h3>
            <p>
              If an event is postponed or rescheduled, your tickets will remain
              valid for the new date. If you are unable to attend the
              rescheduled event, you may be eligible for a refund depending on
              the specific policy of the Event Organizer. We will notify you via
              email with the available options and deadlines for refund
              requests.
            </p>

            <h3>4. Refund Processing</h3>
            <p>
              Once a refund is approved or an event is cancelled, please allow
              7-10 business days for the funds to appear in your account. The
              exact timing depends on your financial institution's processing
              times.
            </p>

            <h3>5. Contact Us</h3>
            <p>
              If you have questions regarding a specific refund request or need
              further clarification on our policy, please reach out to us:
              <br />
              <br />
              <strong>UCNCEE Support</strong>
              <br />
              123 Event Horizon Blvd
              <br />
              Los Angeles, CA 90012
              <br />
              support@UCNCEE.com
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
