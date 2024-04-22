import Link from "next/link";
import React from "react";

export default function page() {
  return (
    <div className="flex flex-col justify-start max-w-5xl mx-auto px-8">
      <h1 className="text-3xl mb-6 text-primary font-bold">
        Cookie Policy for BookOkay.app
      </h1>
      <ol className=" text-lg font-bold mb-6 list-decimal ml-4">
        <li>
          <Link
            className="hover:underline"
            href={"/legal/cookie-policy#introduction"}
          >
            Introduction
          </Link>
        </li>
        <li>
          <Link
            className="hover:underline"
            href={"/legal/cookie-policy#what-are-cookies"}
          >
            What Are Cookies?
          </Link>
        </li>
        <li>
          <Link
            className="hover:underline"
            href="/legal/cookie-policy#how-we-use-cookies"
          >
            How We Use Cookies
          </Link>
        </li>
        <li>
          <Link
            className="hover:underline"
            href="/legal/cookie-policy#consent-for-cookies"
          >
            Consent for Cookies
          </Link>
        </li>
        <li>
          <Link
            className="hover:underline"
            href="/legal/cookie-policy#your-choices-and-rights"
          >
            Your Choices and Rights
          </Link>
        </li>
        <li>
          <Link
            className="hover:underline"
            href="/legal/cookie-policy#changes-to-cookie-policy"
          >
            Changes to the Cookie Policy
          </Link>
        </li>
        <li>
          <Link
            className="hover:underline"
            href="/legal/cookie-policy#contact-us"
          >
            Contact Us
          </Link>
        </li>
        <li>
          <Link
            className="hover:underline"
            href="/legal/cookie-policy#more-information"
          >
            More Information
          </Link>
        </li>
      </ol>
      <ol className="space-y-4 list-decimal legal">
        <li id="introduction">
          <h2>Introduction</h2>
          <p>
            Welcome to BookOkay.app! Our website uses cookies to ensure you get
            the best experience, particularly when it comes to securely
            accessing your account. This Cookie Policy provides you with
            detailed information about how we use cookies, the type of cookies
            we deploy, and how they are integral to the functionality of our
            service.
          </p>
          <p>
            Cookies are small text files that are stored on your device
            (computer, tablet, or mobile phone) when you visit websites. We use
            these cookies exclusively to manage user sessions and keep you
            logged in as you navigate our site. This is essential for providing
            a seamless, secure user experience.
          </p>
          <p>
            By continuing to use our services as a registered user, you agree to
            our use of cookies necessary for authentication and session
            management. If you are visiting as an anonymous user, we will ask
            for your consent via a cookie banner before any cookies are set.
          </p>
        </li>

        <li id="data-collection">
          <h2>Data Collection</h2>
          <h3>Types of Data Collected:</h3>
          <p>
            We collect your chosen username, which functions as your unique
            identifier on our platform.
          </p>
          <h3>When We Collect Data:</h3>
          <p>
            During Account Creation. When you register an account with us, we
            collect your username, email address, and password.
          </p>
          <p>
            During Transactions. When you make a purchase, we record the
            transaction details, including the labels you acquire. Although
            payment information is handled by{" "}
            <Link href="https://stripe.com/privacy" target="_blank">
              Stripe
            </Link>
            , we do not store your payment details on our servers.
          </p>
          <p>
            Non-Sensitive Data. We emphasize that no sensitive personal
            information (such as your racial or ethnic origin, political
            opinions, religious or philosophical beliefs, health information,
            biometric data, or sexual orientation) is collected or processed by
            BookOkay.app.
          </p>
        </li>
        <li id="how-we-use-cookies">
          <h2>How We Use Cookies</h2>
          <p>
            Our use of cookies is straightforward and focused solely on
            providing a secure and efficient user experience. Here’s how we
            implement cookies on our website:
          </p>
          <p>
            <strong>Authentication:</strong> We use cookies to identify you once
            you have logged into our site. This allows us to maintain your
            session and keep you logged in as you navigate different pages of
            BookOkay.app, ensuring that you don’t need to log in repeatedly.
          </p>
          <p>
            <strong>Session Management:</strong> Our cookies help manage your
            session on our website. This includes keeping track of your login
            status and ensuring that your session remains secure.
          </p>
          <p>
            <strong>Types of Cookies Used:</strong> Session Cookies. These are
            temporary cookies used to remember you during your session. They are
            deleted when you close the browser.
          </p>
        </li>

        <li id="consent-for-cookies">
          <h2>Consent for Cookies</h2>
          <p>
            We prioritize your privacy and are committed to clear and
            transparent communication regarding your data. Here’s how we handle
            consent for cookies:
          </p>
          <p>
            <strong>Registered Users:</strong> If you create an account and log
            in to BookOkay.app, we assume your consent for the use of cookies
            that are strictly necessary for authentication and maintaining your
            session.
          </p>
          <p>
            <strong>Anonymous Visitors:</strong> For visitors who do not have an
            account, or are not logged in, we use a cookie consent banner that
            appears when you first visit our site.
          </p>
          <p>
            <strong>Managing Your Cookie Preferences:</strong> You can manage
            your cookie settings through your browser to refuse certain types of
            cookies or delete them entirely.
          </p>
          <p>
            <strong>Withdrawal of Consent:</strong> You may withdraw your
            consent at any time through your browser settings.
          </p>
        </li>

        <li id="your-choices-and-rights">
          <h2>Your Choices and Rights</h2>
          <p>
            We are committed to ensuring that you have full control over the use
            of cookies and the personal data they may collect. Here are the
            options available to you:
          </p>
          <p>
            <strong>Managing Cookie Preferences:</strong> You can manage your
            cookie settings through your browser.
          </p>
          <p>
            <strong>Access to Your Personal Information:</strong> You have the
            right to request access to the personal data we hold about you.
          </p>
          <p>
            <strong>Rectification and Erasure:</strong> You have the right to
            ask us to correct or complete incorrect or incomplete personal
            information.
          </p>
          <p>
            <strong>Making a Complaint:</strong> You have the right to lodge a
            complaint about the way we handle or process your personal data with
            your national data protection regulator.
          </p>
        </li>

        <li id="changes-to-cookie-policy">
          <h2>Changes to the Cookie Policy</h2>
          <p>
            At BookOkay.app, we continually strive to improve our services and
            enhance user experience, which may necessitate updates to our Cookie
            Policy from time to time. Here’s how we will manage and communicate
            these changes:
          </p>
          <p>
            <strong>Notification of Changes:</strong> We will inform you of any
            significant changes to our Cookie Policy by posting a notice on our
            website.
          </p>
          <p>
            <strong>Access to the Updated Policy:</strong> The most current
            version of our Cookie Policy will always be accessible on our
            website at BookOkay.app/legal/cookie-policy.
          </p>
          <p>
            <strong>Review Period:</strong> After changes are posted, they will
            take effect immediately for new users and within 30 days for
            existing users.
          </p>
          <p>
            <strong>Archival of Previous Versions:</strong> Previous versions of
            our Cookie Policy will be archived and accessible upon request.
          </p>
        </li>

        <li id="contact-us">
          <h2>Contact Us</h2>
          <p>
            If you have any questions or concerns regarding our Cookie Policy,
            or if you wish to exercise any of your rights as outlined in this
            document, please do not hesitate to contact us.
          </p>
          <p>
            Email: You can reach our support team by sending an email to{" "}
            <Link href="mailto:support@bookokay.app">support@bookokay.app</Link>
            .
          </p>
          <p>
            Online Contact Form: Visit our website at{" "}
            <Link href="/contact">www.bookokay.app/contact</Link> to fill out
            our online contact form.
          </p>
        </li>

        <li id="more-information">
          <h2>More Information</h2>
          <p>
            For those who seek to understand more about cookies and your privacy
            rights, we provide additional resources and links to help you become
            more informed.
          </p>
          <p>
            To learn more about cookies, you can visit{" "}
            <Link href="https://allaboutcookies.org">All About Cookies</Link>.
          </p>
          <p>
            The Information Commissioner’s Office (ICO) offers comprehensive
            guides on privacy and rights under the GDPR for users in the
            European Union. Visit{" "}
            <Link href="https://ico.org.uk/your-data-matters/online/cookies/">
              ICO&apos;s Cookies Guide
            </Link>
            .
          </p>
          <p>
            For details on how we handle personal data beyond the use of
            cookies, please refer to our Privacy Policy available at{" "}
            <Link href="/legal/privacy-policy">
              bookokay.app/legal/privacy-policy
            </Link>
            .
          </p>
        </li>
      </ol>
    </div>
  );
}
