import Link from "next/link";

export default function Page() {
  return (
    <div className="flex flex-col justify-start max-w-5xl mx-auto px-8">
      <h1 className="text-3xl mb-6 text-primary font-bold">
        Terms of Service for BookOkay.app
      </h1>
      <ol className=" text-lg font-bold mb-6 list-decimal ml-4">
        <li>
          <Link
            className="hover:underline"
            href={"/legal/terms-of-service#introduction"}
          >
            Introduction
          </Link>
        </li>
        <li>
          <Link
            className="hover:underline"
            href={"/legal/terms-of-service#service-description"}
          >
            Service Description
          </Link>
        </li>
        <li>
          <Link
            className="hover:underline"
            href="/legal/terms-of-service#user-eligibility"
          >
            User Eligibility
          </Link>
        </li>
        <li>
          <Link
            className="hover:underline"
            href="/legal/terms-of-service#account-registration-and-management"
          >
            Account Registration and Management
          </Link>
        </li>
        <li>
          <Link
            className="hover:underline"
            href="/legal/terms-of-service#user-responsibilities"
          >
            User Responsibilities
          </Link>
        </li>
        <li>
          <Link
            className="hover:underline"
            href="/legal/terms-of-service#ntellectual-property"
          >
            Intellectual Property
          </Link>
        </li>
        <li>
          <Link
            className="hover:underline"
            href="/legal/terms-of-service#service-availability"
          >
            Service Availability
          </Link>
        </li>
        <li>
          <Link
            className="hover:underline"
            href="/legal/terms-of-service#changes-to-the-terms"
          >
            Changes to the Terms
          </Link>
        </li>
        <li>
          <Link
            className="hover:underline"
            href="/legal/terms-of-service#dispute-resolution"
          >
            Dispute Resolution
          </Link>
        </li>
        <li>
          <Link
            className="hover:underline"
            href="/legal/terms-of-service#contact-information"
          >
            Contact Information
          </Link>
        </li>
      </ol>
      <ol className="space-y-4 list-decimal legal">
        <li id="introduction">
          <h2>Introduction</h2>
          <p>
            Welcome to BookOkay.app! Our platform is designed for managing
            personal and business libraries, allowing users to view, borrow, and
            lend books within their network of friends. By using our services,
            you agree to comply with these Terms of Use. Please read them
            carefully before using the platform.
          </p>
        </li>

        <li id="service-description">
          <h2>Service Description</h2>
          <p>
            BookOkay.app provides a digital library management system that
            enables users to catalog their books, manage lending and borrowing
            transactions, and explore books available in friends&apos;
            libraries. The service is intended for both private individuals and
            businesses. Users need to pair specific labels with our app to
            utilize all functionalities fully.
          </p>
        </li>
        <li id="user-eligibility">
          <h2>User Eligibility</h2>
          <p>
            Our services are available globally to anyone with the necessary
            labels that pair with the app. There are no age or geographical
            restrictions; however, users must ensure they can legally use the
            app in their location.
          </p>
        </li>
        <li id="account-registration-and-managment">
          <h2>Account Registration and Management</h2>
          <p>
            To fully utilize our services, users must register an account using
            a valid email address and create a password. Account registration
            enables you to manage your library and participate in borrowing
            activities. You can delete your account at any time, and all
            associated data will be removed from our systems in compliance with
            our Privacy Policy.
          </p>
        </li>
        <li id="service-description">
          <h2>User Responsibilities</h2>
          <p>
            Users are expected to use BookOkay.app solely for the purposes of
            managing libraries, borrowing, and lending books. The use of our
            platform for distributing illegal content, including hate speech or
            other forms of illegal literature, is strictly prohibited.
          </p>
        </li>
        <li id="intellectual-property">
          <h2>Intellectual Property</h2>
          <p>
            BookOkay.app respects the intellectual property rights of all
            parties. Since our platform does not involve user-generated content,
            there are no issues regarding copyright concerns within our service.
          </p>
        </li>
        <li id="service-availability">
          <h2>Service Availability</h2>
          <p>
            We strive to maintain continuous availability of our services. In
            the event of planned downtime or unexpected disruptions, we will
            provide updates on our website. Users outside of Europe may
            experience longer loading times due to server locations.
          </p>
        </li>
        <li id="changes-to-the-terms">
          <h2>Changes to the Terms</h2>
          <p>
            We may update these Terms of Use from time to time. All changes will
            be communicated via email to the users. If you disagree with the
            revised terms, you are free to close your account and stop using our
            services.
          </p>
        </li>
        <li id="dispute-resolution">
          <h2>Dispute Resolution</h2>
          <p>
            Disputes arising under these Terms of Use should be communicated to
            us via email at{" "}
            <Link href="mailto:support@bookokay.app">
              support@bookokay.app{" "}
            </Link>
            . We aim to resolve any disputes amicably and efficiently.
          </p>
        </li>
        <li id="dispute-resolution">
          <h2>Dispute Resolution</h2>
          <p>
            If you have any questions or concerns about these Terms of Use,
            please contact us at{" "}
            <Link href="mailto:support@bookokay.app">
              support@bookokay.app{" "}
            </Link>
            . We are committed to providing you with excellent service and
            support.
          </p>
        </li>
        <p>
          Effective Date: These Terms of Use are effective as of 01/05/2024.
        </p>
      </ol>
    </div>
  );
}
