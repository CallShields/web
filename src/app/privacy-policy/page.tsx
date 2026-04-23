import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Link from "next/link";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      <Navbar />
      <main className="container mx-auto px-4 py-16 max-w-4xl">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-12">
          <h1 className="text-3xl font-bold text-[#0A2540] mb-8">
            Privacy Policy
          </h1>

          <div className="prose prose-sm max-w-none text-[#64748B] space-y-6">
            <p className="text-sm italic text-[#94A3B8]">
              Latest update: April 23, 2026
            </p>

            <p>
              Welcome to CallShields. CallShields (hereinafter referred to as "CallShields," "we," "us," "our," and similar terms) operates the CallShields mobile application as a scam detection service. By using the CallShields application, you acknowledge and agree that CallShields is the entity responsible for the collection, use, and protection of your personal information as described in this Privacy Policy.
            </p>

            <p>
              Please carefully read this Policy before you use or submit any information through or in connection with the CallShields application. If you do not agree with this Policy, please do not access or use our application. Unless otherwise required by laws in your residence, by using our application, you accept our privacy practices described in this Policy.
            </p>

            <hr className="my-8 border-gray-200" />

            <section>
              <h2 className="text-xl font-bold text-[#0A2540] mt-8 mb-4">
                1. What information we collect about you?
              </h2>
              <p>
                We collect and store personal information that you directly provide us through our application, when using our services, and other ways:
              </p>

              <h3 className="font-semibold text-[#0A2540] mb-2 mt-4">Information you provide to us</h3>
              <p>
                We will collect and store personal information that you provide to us directly through the CallShields application. The information we collect includes:
              </p>

              <div className="ml-4 mt-4">
                <h4 className="font-semibold text-[#0A2540] mb-2">Account and profile information</h4>
                <p className="mb-2">When you register for an account, create or modify your profile, set preferences, or sign-up for our paid cloud services, we collect information about you which includes without limitation your email address, and passwords or similar security information used for authentication and account access.</p>

                <h4 className="font-semibold text-[#0A2540] mb-2 mt-4">Call-related information</h4>
                <p className="mb-2">As part of the scam detection service, we collect and store information related to phone calls you receive or make through our application. This includes:</p>
                <ul className="list-disc ml-6 space-y-2">
                  <li>Phone numbers of incoming and outgoing calls</li>
                  <li>Call timestamps and duration</li>
                  <li>Transcriptions of call conversations (when cloud analysis mode is enabled)</li>
                  <li>Audio data processed for transcription purposes</li>
                  <li>Call logs and scam detection results</li>
                </ul>

                <h4 className="font-semibold text-[#0A2540] mb-2 mt-4">Information provided through our support channels</h4>
                <p className="mb-2">Through our user support, you can choose to submit information about any issues you encounter while using our services. You may contact us through email to directly communicate with our support team. You will be asked to provide contact information, a summary of the issue you are facing, and any additional documents, screenshots, or information that may help to resolve the problem.</p>

                <h4 className="font-semibold text-[#0A2540] mb-2 mt-4">Payment and billing information</h4>
                <p className="mb-2">When you use the paid cloud analysis features of CallShields, we collect your payment and billing information. You may also be required to provide credit card information to third-party secure payment processing service providers (such as Stripe). We do not store your credit card information.</p>
              </div>

              <h3 className="font-semibold text-[#0A2540] mb-2 mt-4">Information we collect automatically when you use the Services</h3>
              <p>
                When you use our application, we may collect information about you:
              </p>

              <div className="ml-4 mt-4">
                <h4 className="font-semibold text-[#0A2540] mb-2">Your Use of the Services</h4>
                <p className="mb-2">When you access any of our services and interact with them, we may track certain information about you, including but not limited to the features you use, scam detection alerts triggered, settings you configure, and how you interact with our application.</p>

                <h4 className="font-semibold text-[#0A2540] mb-2 mt-4">Device and Connection Information</h4>
                <p className="mb-2">We collect information about the Android devices you use to access our services. This type of device information includes your connection type and settings when installing, accessing, updating, or using our services. We also collect information about your operating system version, device model, device identifiers, and crash data through your device.</p>

                <h4 className="font-semibold text-[#0A2540] mb-2 mt-4">Geolocation Data</h4>
                <p className="mb-2">Based on your device settings, we may collect geolocation data when you use our products. For example, we may use your IP address to infer your approximate location.</p>
              </div>

              <h3 className="font-semibold text-[#0A2540] mb-2 mt-4">Information we receive from other sources</h3>
              <p>
                We receive information about you from third-party service providers and public databases. We may combine this information with the information we collect through other means. This helps us update and improve our records, identify new customers, and improve our scam detection capabilities. When asked to provide personal information, you may refuse. However, if you choose not to provide the information required for certain features, these features or some of their functions may not be available or may not function properly.
              </p>
              <p>
                We are not responsible for the data policies and procedures or content of any third party. We recommend that you review the privacy policies of each service you use.
              </p>
            </section>

            <hr className="my-8 border-gray-200" />

            <section>
              <h2 className="text-xl font-bold text-[#0A2540] mt-8 mb-4">
                2. How we use information we collect?
              </h2>
              <p>
                We collect and process personal information about you as necessary to provide the scam detection services you use, operate our application and business, meet our contractual and legal obligations, protect the security of our systems and our customers, or fulfil other legitimate interests as described in this Privacy Policy.
              </p>
              <p>
                For example, we may use any of the categories of personal information we describe above to:
              </p>

              <ul className="list-disc ml-6 space-y-2">
                <li>Operate, maintain and improve our internal operations, systems, and Products.</li>
                <li>Provide real-time scam detection and analysis of your phone calls to protect you from fraudulent activities.</li>
                <li>Understand you and your preferences to enhance your experience using our application and improve scam detection accuracy.</li>
                <li>Monitor and analyze user interactions with our application to identify trends, usage patterns, and improve our AI models.</li>
                <li>Respond to your comments and questions and provide technical support or customer service.</li>
                <li>Provide and deliver the Products you request, including both local and cloud-based scam detection services.</li>
                <li>Comply with applicable laws, rules, or regulations and cooperate and defend legal claims and audits.</li>
                <li>Communicate with you about promotions, upcoming events, and other news about products and services offered by CallShields.</li>
                <li>Protect the application and services, and investigate and deter against fraudulent, unauthorized, or illegal activity.</li>
              </ul>

              <p className="mt-4">
                We may also use such information in any other way we may describe when you provide the information or for any other purpose with your consent.
              </p>
            </section>

            <hr className="my-8 border-gray-200" />

            <section>
              <h2 className="text-xl font-bold text-[#0A2540] mt-8 mb-4">
                3. How we share information we collect?
              </h2>
              <p>
                We may share your personal information with your consent. We may also share any category of personal information described above:
              </p>

              <div className="ml-4 mt-4">
                <h4 className="font-semibold text-[#0A2540] mb-2">Sharing with our business partners and other third-party service providers</h4>
                <p className="mb-2">We share information with third parties who help us operate, provide, improve, integrate, customize, support, and market our services. For example, to provide services to you, we may share information with third-party service partners who provide cloud infrastructure, payment processing, analytics, and other services to us. Such services may require the service provider to access or use information about you. If a service provider needs to access information about you to act on our behalf in performing services, they will do so under our close instruction and adopt appropriate security and confidentiality procedures to protect your information.</p>

                <h4 className="font-semibold text-[#0A2540] mb-2 mt-4">Sharing with potential buyers and advisors</h4>
                <p className="mb-2">If there is a company sale, merger, reorganization, dissolution, similar event, or measures taken in anticipation of such event (such as due diligence in a transaction), your personal information may (in accordance with applicable law) be shared with our advisors and any potential buyer's advisors and be transferred to the new owner of the business.</p>

                <h4 className="font-semibold text-[#0A2540] mb-2 mt-4">Sharing information to maintain compliance with laws and regulations</h4>
                <p className="mb-2">We may share information as required by law or subpoena, or if we reasonably believe that such action is necessary to comply with applicable laws or the reasonable requests of law enforcement, enforce our terms of service, or protect the security or integrity of our application and services, or to exercise or protect the rights, property, or personal safety of our customers, users, or others.</p>
              </div>

              <p className="mt-4 font-semibold text-[#0A2540]">
                Important note about call data: Your call transcripts and audio data are processed for scam detection purposes only. We do not sell your call data to third parties for advertising or marketing purposes.
              </p>
            </section>

            <hr className="my-8 border-gray-200" />

            <section>
              <h2 className="text-xl font-bold text-[#0A2540] mt-8 mb-4">
                4. Data Retention and Security
              </h2>
              <p>
                We retain personal information for as long as necessary for the purposes for which the personal information is processed and for longer periods as necessary for us to comply with applicable laws. For example, we retain your account information for as long as your account is active or as needed to provide you with Products you have requested or authorized, including maintaining and improving the performance of the scam detection services and protecting system security. We also retain personal data as needed to maintain appropriate business and financial records, protect our legal interests, resolve disputes, or comply with legal or regulatory requirements. Thereafter, we will either delete or anonymize it or, if this is not possible (for example, because your personal information has been stored in backup archives), then we will store your personal information using appropriate security measures and take appropriate steps designed to isolate it from any further processing until deletion is possible.
              </p>
              <p>
                <strong>Local Mode vs. Cloud Mode:</strong> When you use Local Mode, all call processing happens on your device and no call data is transmitted to our servers. When you use Cloud Mode, call transcripts may be transmitted to our servers for advanced AI analysis. You can choose which mode to use in your application settings.
              </p>
              <p>
                The information collected through our application may be stored and processed in any country/region where CallShields or its affiliated companies or service providers maintain facilities. Our choice of processing location is to ensure efficient operations, improve performance, and create redundancy to protect data in the event of disruptions or other issues. We take measures to ensure that the data we collect in accordance with this Privacy Policy is processed in compliance with this Privacy Policy and applicable laws, regardless of where the data is located.
              </p>
              <p>
                CallShields cares about the security of your information and takes reasonable and appropriate technical and organizational measures designed to prevent loss, misuse, and unauthorized access, disclosure, alteration, and destruction of personal information. However, no security system is impenetrable, and we cannot guarantee the security of our systems or your information.
              </p>
            </section>

            <hr className="my-8 border-gray-200" />

            <section>
              <h2 className="text-xl font-bold text-[#0A2540] mt-8 mb-4">
                5. How to access and control your information?
              </h2>
              <p>
                You have certain rights regarding your personal information, subject to the applicable laws. These include the following rights to:
              </p>

              <ul className="list-disc ml-6 space-y-2">
                <li><strong>Access your personal information:</strong> You have the right to ask us to confirm whether we are processing your personal information, and, where that is the case, access to the personal information and receive information on how your data is processed as well as ask us to provide a copy of your personal information.</li>
                <li><strong>Rectify your personal information:</strong> You have the right to have any incorrect, incomplete or inaccurate data we hold about you corrected.</li>
                <li><strong>Erase your personal information:</strong> You have the right to ask us to delete your personal information when, for example, the data we hold on to you is no longer needed or when your data has been processed unlawfully.</li>
                <li><strong>Object to processing:</strong> You have the right to object to the processing of your personal information and request us to cease processing of it if, for example, this data is being processed for the purpose of direct marketing or where we are relying on a legitimate interest (or those of a third party). Under certain circumstances, we may demonstrate that we have compelling legitimate grounds to process your information which override your rights and freedoms.</li>
                <li><strong>Restrict the processing:</strong> You have the right to ask us to suspend the processing of your personal information in the following scenarios: (a) if you want us to establish the accuracy of the personal information; (b) if our use of the data is illegal but you do not want it erased; (c) if you require us to hold the data even if we no longer need it as you require it to establish, exercise or defend legal claims; or (d) if you have objected to our use of your data but we need to verify whether we have overriding legitimate grounds to use it.</li>
                <li><strong>Receive your personal information in a usable electronic format and transmit it to a third party (right to data portability):</strong> If we are processing your personal information based on your consent or a contract, you can ask to receive your personal information in a structured, commonly used and machine-readable format. Without any obstacle from us, you can also ask us to transmit those data to another controller.</li>
                <li><strong>Withdraw consent:</strong> Where we are relying on your consent to process your personal information, you have the right to withdraw your consent at any time. However, this will not affect the lawfulness of any processing carried out before you withdraw your consent. If you withdraw your consent, we will no longer process that personal information, but we may be unable to continue providing certain products or services to you for which the personal information was sought. At the time you withdraw your consent, we will advise you if this is the case.</li>
                <li><strong>Opt-out of communications:</strong> By using the unsubscribe link within each email, updating your email preferences within your Service account settings menu, or by contacting us as provided below to have your contact information removed from our promotional email list or registration database, you may opt-out of receiving promotional communications from us. You will continue to receive transactional messages from us regarding our Services even after you opt-out from receiving promotional messages from us.</li>
                <li><strong>Delete your data:</strong> You can delete your account and all associated data at any time through the application settings or by contacting us. When using Local Mode, you can also clear on-device call history and transcripts directly from your device.</li>
              </ul>

              <p className="mt-4">
                These rights may be limited in some situations – for example, where we can demonstrate that we have a legal requirement to process your data (such as where tax authorities require us to retain it) or where it is needed for the proper performance of a contract. Under certain circumstances, this may mean that we are able to retain data even if you withdraw your consent.
              </p>
              <p>
                To exercise any of these rights or to submit a data request, please contact us. When submitting a request, please provide sufficient information to identify yourself and the specific action you're requesting. We will respond to your request within the timeframe required by applicable law. In some cases, we may need to verify your identity or request additional information to process your request accurately.
              </p>
            </section>

            <hr className="my-8 border-gray-200" />

            <section>
              <h2 className="text-xl font-bold text-[#0A2540] mt-8 mb-4">
                6. Our policy toward children
              </h2>
              <p>
                Our Services are NOT directed to children under the age of 18 and we do not knowingly collect personal information from children under 18. If we become aware that a child under 18 has provided us with personal information, we will promptly delete such personal data from our systems. If you become aware or have reason to believe that a child has provided us with personal information through our Services, please contact us and we will delete that information from our databases.
              </p>
            </section>

            <hr className="my-8 border-gray-200" />

            <section>
              <h2 className="text-xl font-bold text-[#0A2540] mt-8 mb-4">
                7. Changes to our policy
              </h2>
              <p>
                We may modify this Policy at any time, without prior notice, and changes may apply to any personal information we already hold about you, as well as any new personal information collected after the Policy is modified. If we make changes, we will notify you by revising the date at the top of this Policy. We will provide you with advanced and more prominent notice if we make any material changes to how we collect, use or disclose your personal information that impacts your rights under this Policy. Unless otherwise required by laws in your residence, your continued access or use of our Services after receiving the notice of changes, constitutes your acknowledgement that you accept the updated Policy.
              </p>
              <p>
                In addition, we may provide you with real-time disclosures or additional information about the personal information handling practices of specific parts of our Services. Such notices may supplement this Policy or provide you with additional choices about how we process your personal information. If you disagree with any changes to this Policy, you will need to stop using the Services and deactivate your account(s), as outlined above.
              </p>
            </section>

            <hr className="my-8 border-gray-200" />

            <section>
              <h2 className="text-xl font-bold text-[#0A2540] mt-8 mb-4">
                Contact Us
              </h2>
              <p>
                If you have any questions about this Privacy Policy or our data practices, please contact us via our{" "}
              <a
                href="https://forms.gle/grHFMSrgpsNy7zAA8"
                className="text-[#00D4AA] hover:underline"
              >
                contact form
              </a>
              .
              </p>
            </section>

            <hr className="my-8 border-gray-200" />

          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
