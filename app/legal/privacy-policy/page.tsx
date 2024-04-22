import Link from "next/link";
import React from "react";

export default function Page() {
  return (
    <div className="flex flex-col justify-start max-w-5xl mx-auto px-8">
      <h1 className="text-3xl mb-6 text-primary font-bold">
        Privacy Policy for BookOkay.app
      </h1>
      <ol className=" text-lg font-bold mb-6 list-decimal ml-4">
        <li>
          <Link
            className="hover:underline"
            href={"/legal/privacy-policy#introduction"}
          >
            Introduction
          </Link>
        </li>
        <li>
          <Link
            className="hover:underline"
            href={"/legal/privacy-policy#data-collection"}
          >
            Data collection
          </Link>
        </li>
        <li>
          <Link
            className="hover:underline"
            href="/legal/privacy-policy#purpose-of-data-collections"
          >
            Purpose of Data Collection
          </Link>
        </li>
        <li>
          <Link
            className="hover:underline"
            href="/legal/privacy-policy#data-sharing-and-disclosure"
          >
            Data Sharing and Disclosure
          </Link>
        </li>
        <li>
          <Link
            className="hover:underline"
            href="/legal/privacy-policy#data-storage-and-security"
          >
            Data Storage and Security
          </Link>
        </li>
        <li>
          <Link
            className="hover:underline"
            href="/legal/privacy-policy#user-rights-and-choices"
          >
            User Rights and Choices
          </Link>
        </li>
        <li>
          <Link
            className="hover:underline"
            href="/legal/privacy-policy#international-data-transfers"
          >
            International Data Transfers
          </Link>
        </li>
        <li>
          <Link
            className="hover:underline"
            href="/legal/privacy-policy#Childrens-privacy"
          >
            Children’s Privacy
          </Link>
        </li>
        <li>
          <Link
            className="hover:underline"
            href="/legal/privacy-policy#updates-to-the-privacy-policy"
          >
            Updates to the Privacy Policy
          </Link>
        </li>
        <li>
          <Link
            className="hover:underline"
            href="/legal/privacy-policy#contact-information"
          >
            Contact Information
          </Link>
        </li>
      </ol>
      <ol className="space-y-4 list-decimal legal">
        <li id="introduction">
          <h2>Introduction</h2>
          <p>
            Welcome to BookOkay.app! Your privacy is critically important to us,
            and we are committed to protecting the personal information you
            share with us. This Privacy Policy outlines the types of data we
            collect, how it is used, and the measures we take to ensure your
            personal information is secure.
          </p>
          <p>
            At BookOkay.app, we collect data to enhance our library management
            application and ensure you receive a tailored and efficient user
            experience. This includes managing your account, processing
            purchases, and improving our services. The data we collect includes
            your name (username), email address, password, and a list of books
            you interact with on our platform.
          </p>
          <p>
            It&apos;s important to note that we do not collect sensitive
            personal information. All data collection and processing are carried
            out in full compliance with the General Data Protection Regulation
            (GDPR) and other relevant privacy laws.
          </p>
          <p>
            Our goal is to provide you with clear information about our data
            practices, so you can make informed decisions about the data you
            choose to share with us. By using BookOkay.app, you agree to the
            collection and use of information in accordance with this policy.
          </p>
        </li>

        <li id="data-collection">
          <h2>Data Collection</h2>
          <p>
            At BookOkay.app, we collect information that is essential for
            providing and improving our services. Here is a detailed explanation
            of the types of personal information we collect and the
            circumstances under which they are gathered:
          </p>
          <h3>Types of Data Collected:</h3>
          <p>
            We collect your chosen username, which functions as your unique
            identifier on our platform. Password: We require a password to
            secure your account and ensure that access is granted only to the
            rightful owner.
          </p>
          <p>
            Your email address is used for communication purposes, such as
            sending purchase confirmations, password reset requests, and
            notifications about changes to our services or policies.
          </p>
          <p>
            We maintain a record of the books you purchase or interact with on
            our site to enhance your experience by providing personalized
            recommendations and managing your library efficiently.
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
            <Link href="https://stripe.com/privacy">Stripe</Link>, we do not
            store your payment details on our servers.
          </p>
          <p>
            Non-Sensitive Data. We emphasize that no sensitive personal
            information (such as your racial or ethnic origin, political
            opinions, religious or philosophical beliefs, health information,
            biometric data, or sexual orientation) is collected or processed by
            BookOkay.app.
          </p>
          <p>
            This data is fundamental to the operation of our library management
            system and is used strictly in accordance with this Privacy Policy.
            The collection and use of personal data are geared towards providing
            you with a secure, efficient, and personalized user experience.
          </p>
        </li>

        <li id="purpose-of-data-collection">
          <h2>Purpose of Data Collection</h2>
          <h3>Account Management: Authentication and Security</h3>
          <p>
            Your username and password are essential for securing your account
            and verifying your identity, ensuring that access is restricted to
            you alone.
          </p>
          <h3>Communication</h3>
          <p>
            Your email address is used to communicate important information
            about your account, such as security notices, password reset
            instructions, and updates to our terms or privacy policy. Email is
            also used to send book borrow and lending notifications.
          </p>
          <h3>Library Services: Personalization</h3>
          <p>
            The list of books you interact with helps us tailor the application
            to better suit your preferences and reading habits. This allows us
            to offer personalized recommendations and improve your browsing
            experience.
          </p>
          <h3>Library Management</h3>
          <p>
            We use your data to efficiently manage the library resources
            available to you, tracking your interactions and transactions to
            ensure accurate and timely availability of books.
          </p>
          <h3>Service Improvement: User Experience</h3>
          <p>
            By understanding how you and other users interact with our site, we
            can identify opportunities for improvement, making the service more
            intuitive and user-friendly.
          </p>
          <h3>Feedback and Support</h3>
          <p>
            Your contact details enable us to reach out for feedback and provide
            support when you encounter issues or have queries regarding our
            service.
          </p>
        </li>

        <li id="data-sharing-and-disclosure">
          <h2>Data Sharing and Disclosure</h2>
          <h3>Limited sharing</h3>
          <p>
            No Third-Party Sharing: We do not share your personal data with any
            third parties for marketing, advertising, or similar services. Your
            information is used solely for the purposes outlined in this policy
            and is kept within the confines of our operational needs.
          </p>
          <h3>Service providers: Payment Processing</h3>
          <p>
            While we integrate with Stripe for payment processing, it&apos;s
            important to note that Stripe operates independently as a payment
            processor. We do not store nor have access to your credit card
            details or other payment information.{" "}
            <Link href="https://stripe.com/privacy">
              Read Stripe&apos;s Privacy Policy
            </Link>
            .
          </p>
          <h3>Infrastructure Services</h3>
          <p>
            We use Supabase for data management and backend services. Supabase
            only accesses your data to the extent necessary to perform these
            services on our behalf, under strict confidentiality obligations.{" "}
            <Link href="https://supabase.com/docs/guides/security">
              Explore Supabase&apos;s Security Features
            </Link>
            .
          </p>
          <h3>Legal Requirements: Compliance with Laws</h3>
          <p>
            We may disclose your personal data where required by law or
            subpoena.
          </p>
          <p>
            Safety and Security. We may also share your data if we believe it is
            necessary to investigate, prevent, or take action regarding
            potential violations of our policies, suspected fraud, situations
            involving potential threats to the safety of any person, or as
            evidence in litigation in which we are involved.
          </p>
        </li>

        <li id="data-storage-and-security">
          <h2>Data Storage and Security</h2>
          <h3>Data Storage Location: Servers in Germany</h3>
          <p>
            All personal data collected by BookOkay.app is stored on secure
            servers located in Germany. Storing data within Germany ensures
            compliance with stringent European Union data protection
            regulations.
          </p>
          <h3>Security Measures: Encryption</h3>
          <p>
            We use industry-standard encryption methods to protect your data
            both in transit and at rest. This includes the use of secure
            protocols for data transmission and encrypted storage solutions.
          </p>
          <h3>Supabase Security Features</h3>
          <p>
            We leverage Supabase’s robust security features, including row-level
            security and authentication mechanisms, to ensure that your data is
            accessed only by authorized personnel and systems.
          </p>
          <h3>Regular Security Audits</h3>
          <p>
            We conduct regular security assessments and audits to identify and
            mitigate potential vulnerabilities in our system. This continuous
            improvement process helps safeguard your data against emerging
            security threats.
          </p>
          <h3>Data Access Control: Restricted Access</h3>
          <p>
            Access to your personal data is strictly limited to personnel who
            need the information to perform their job functions. These
            individuals are bound by confidentiality obligations and may be
            subject to discipline, including termination and criminal
            prosecution, if they fail to meet these obligations.
          </p>
          <h3>Authentication and Authorization</h3>
          <p>
            We employ advanced authentication and authorization techniques to
            ensure that access to data is controlled and logged for security
            purposes.
          </p>
          <h3>Data Retention: Retention Policy</h3>
          <p>
            We retain personal data only for as long as necessary to fulfill the
            purposes outlined in this privacy policy unless a longer retention
            period is required or permitted by law. Once the data is no longer
            needed, we securely delete or anonymize it.
          </p>
          <h3>Incident Response: Breach Notification</h3>
          <p>
            Should there be any breach of our security systems impacting your
            personal data, we will inform you and the appropriate authorities as
            required by law without undue delay.
          </p>
          <h3>Continual Monitoring</h3>
          <p>
            We monitor our systems for signs of unauthorized access and have
            procedures in place to respond to potential security breaches
            swiftly.
          </p>
        </li>

        <li id="user-rights-and-choices">
          <h2>User Rights and Choices</h2>
          <h3>Access to Your Information</h3>
          <p>
            You have the right to request access to the personal data we hold
            about you. This allows you to receive a copy of the personal
            information we have about you and to check that we are lawfully
            processing it.
          </p>
          <h3>Correction of Your Information</h3>
          <p>
            If you believe that any information we have on you is incorrect or
            incomplete, you have the right to request that we correct or
            complete this information.
          </p>
          <h3>Deletion of Your Information</h3>
          <p>
            You have the right to request that we delete or remove your personal
            data when there is no good reason for us continuing to process it.
            This is not an absolute right; however, and there may be legal or
            other official reasons why the data needs to be retained.
          </p>
          <h3>Object to Processing</h3>
          <p>
            You have the right to object to the processing of your personal data
            where we are relying on a legitimate interest (or those of a third
            party) and there is something about your particular situation that
            makes you want to object to processing on this ground.
          </p>
          <h3>Restriction of Processing</h3>
          <p>
            You have the right to request the restriction of processing of your
            personal data. This enables you to ask us to suspend the processing
            of personal information about you, for example, if you want us to
            establish its accuracy or the reason for processing it.
          </p>
          <h3>Data Portability</h3>
          <p>
            You have the right to request the transfer of your personal data to
            another party under certain conditions.
          </p>
          <h3>Withdraw Consent</h3>
          <p>
            Where you have provided your consent to the collection, processing,
            and transfer of your personal data for a specific purpose, you have
            the right to withdraw your consent for that specific processing at
            any time. Once we have received notification that you have withdrawn
            your consent, we will no longer process your information for the
            purpose(s) you originally agreed to, unless we have another
            legitimate basis for doing so in law.
          </p>
          <h3>How to Exercise Your Rights</h3>
          <p>
            To exercise any of these rights, please contact us using the
            information provided in the &apos;Contact Us&apos; li of this
            policy. We may need specific information from you to help us confirm
            your identity and ensure your right to access the information (or to
            exercise any of your other rights). This is another appropriate
            security measure to ensure that personal information is not
            disclosed to any person who has no right to receive it.
          </p>
        </li>

        <li id="international-data-transfers">
          <h2>International Data Transfers</h2>
          <p>
            At BookOkay.app, we store and process all personal data within
            Germany. As such, we do not engage in international transfers of
            your personal data across national borders. This practice ensures
            that your personal information remains protected under the stringent
            data protection regulations enforced within Germany and the European
            Union.
          </p>
          <p>
            Should the need arise to transfer personal data outside of these
            jurisdictions in the future, we will update our policy and implement
            appropriate safeguards, such as standard contractual clauses
            approved by the European Commission or other legally recognized
            mechanisms, to ensure the security and legality of the data
            transfer.
          </p>
        </li>

        <li id="childrens-privacy">
          <h2>Children’s Privacy</h2>
          <p>
            At BookOkay.app, we do not specifically target our services towards
            children under the age of 16, nor do we knowingly collect personal
            information from children under this age. However, as there are no
            age restrictions for using our app, it is possible that minors could
            use our services.
          </p>
          <p>
            We take the privacy of children very seriously and encourage parents
            and guardians to take an active role in their children’s online
            activities and interests. If we become aware that we have collected
            personal data from children without verification of parental
            consent, we take steps to remove that information from our servers.
          </p>
        </li>

        <li id="updates-to-the-privacy-policy">
          <h2>Updates to the Privacy Policy</h2>
          <p>
            BookOkay.app reserves the right to update or change our Privacy
            Policy at any time. Changes to this policy will be posted on our
            website and, where appropriate, notified to you by email. We
            encourage you to periodically review this Privacy Policy to stay
            informed about how we are protecting the personal information we
            collect.
          </p>
          <p>
            The date of the last modification to our Privacy Policy is clearly
            displayed at the top of this document. Your continued use of the
            service after any changes or revisions to this Privacy Policy shall
            indicate your agreement with the terms of such revised Privacy
            Policy.
          </p>
        </li>

        <li id="contact-information">
          <h2>Contact Information</h2>
          <p>
            If you have any questions or concerns about our Privacy Policy, or
            if you wish to exercise any of your rights as described in this
            document, please do not hesitate to contact us. We are committed to
            addressing your queries and ensuring your privacy rights are fully
            respected.
          </p>
          <p>You can reach us through the following methods:</p>
          <p>
            Email:{" "}
            <Link href="mailto:support@bookokay.app">support@bookokay.app</Link>
          </p>
          <p>
            Online Contact Form:{" "}
            <Link href="http://www.bookokay.app/contact">
              www.bookokay.app/contact
            </Link>
          </p>
        </li>
      </ol>
    </div>
  );
}
