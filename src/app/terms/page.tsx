import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Link from "next/link";

export default function TermsAndConditions() {
  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      <Navbar />
      <main className="container mx-auto px-4 py-16 max-w-4xl">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-12">
          <h1 className="text-3xl font-bold text-[#0A2540] mb-8">
            Terms &amp; Conditions
          </h1>

          <div className="prose prose-sm max-w-none text-[#64748B] space-y-6">
            <p>
              These terms and conditions apply to the CallShield app (hereby
              referred to as "Application") for mobile devices that was created
              by CallShield (hereby referred to as "Service Provider") as a
              Freemium service.
            </p>

            <p>
              Upon downloading or utilizing the Application, you are
              automatically agreeing to the following terms. It is strongly
              advised that you thoroughly read and understand these terms prior
              to using the Application.
            </p>

            <p>
              CallShields is licensed under a modified version of the GNU Affero General
              Public License v3.0 (AGPL-3.0). You may utilize CallShields commercially,
              including as a backend service for other applications or as an application
              development platform for enterprises. However, a commercial license must be
              obtained from the producer if:
            </p>

            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Multi-tenant service:</strong> Unless explicitly authorized by
                CallShields in writing, you may not use the CallShields source code to
                operate a multi-tenant environment. Within the context of CallShields, one
                tenant corresponds to one workspace, which provides a separated area for
                each tenant's data and configurations.
              </li>
              <li>
                <strong>LOGO and copyright information:</strong> In the process of using
                CallShields's frontend, you may not remove or modify the LOGO or copyright
                information in the CallShields console or applications. The "frontend" of
                CallShields includes all web-based components, mobile app interfaces, and
                user-facing components of the application. This restriction is inapplicable
                to uses of CallShields that do not involve its frontend.
              </li>
            </ul>

            <p className="mt-4">
              As a contributor, you agree that:
            </p>

            <ul className="list-disc pl-6 space-y-2">
              <li>
                The producer can adjust the open-source agreement to be more strict or
                relaxed as deemed necessary.
              </li>
              <li>
                Your contributed code may be used for commercial purposes, including but not
                limited to cloud business operations.
              </li>
            </ul>

            <p className="mt-4">
              Apart from the specific conditions mentioned above, all other rights and
              restrictions follow the GNU Affero General Public License v3.0 (AGPL-3.0).
              Detailed information about the AGPL-3.0 can be found at{" "}
              <a
                href="https://www.gnu.org/licenses/agpl-3.0.html"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#00D4AA] hover:underline"
              >
                https://www.gnu.org/licenses/agpl-3.0.html
              </a>
              . All trademarks, copyrights, database rights, and other intellectual
              property rights related to the Application remain the property of the Service
              Provider.
            </p>

            <p>
              The Service Provider is dedicated to ensuring that the Application
              is as beneficial and efficient as possible. As such, they reserve
              the right to modify the Application or charge for their services
              at any time and for any reason. The Service Provider assures you
              that any charges for the Application or its services will be
              clearly communicated to you.
            </p>

            <p>
              The Application stores and processes personal data that you have
              provided to the Service Provider in order to provide the Service.
              It is your responsibility to maintain the security of your phone
              and access to the Application. The Service Provider strongly
              advise against jailbreaking or rooting your phone, which involves
              removing software restrictions and limitations imposed by the
              official operating system of your device. Such actions could
              expose your phone to malware, viruses, malicious programs,
              compromise your phone's security features, and may result in the
              Application not functioning correctly or at all.
            </p>

            <p>
              Please be aware that the Service Provider does not assume
              responsibility for certain aspects. Some functions of the
              Application require an active internet connection, which can be
              Wi-Fi or provided by your mobile network provider. The Service
              Provider cannot be held responsible if the Application does not
              function at full capacity due to lack of access to Wi-Fi or if you
              have exhausted your data allowance.
            </p>

            <p>
              If you are using the application outside of a Wi-Fi area, please
              be aware that your mobile network provider's agreement terms still
              apply. Consequently, you may incur charges from your mobile
              provider for data usage during the connection to the application,
              or other third-party charges. By using the application, you accept
              responsibility for any such charges, including roaming data
              charges if you use the application outside of your home territory
              (i.e., region or country) without disabling data roaming. If you
              are not the bill payer for the device on which you are using the
              application, they assume that you have obtained permission from
              the bill payer.
            </p>

            <p>
              Similarly, the Service Provider cannot always assume
              responsibility for your usage of the application. For instance, it
              is your responsibility to ensure that your device remains charged.
              If your device runs out of battery and you are unable to access
              the Service, the Service Provider cannot be held responsible.
            </p>

            <p>
              In terms of the Service Provider's responsibility for your use of
              the application, it is important to note that while they strive to
              ensure that it is updated and accurate at all times, they do rely
              on third parties to provide information to them so that they can
              make it available to you. The Service Provider accepts no
              liability for any loss, direct or indirect, that you experience as
              a result of relying entirely on this functionality of the
              application.
            </p>

            <p>
              The Service Provider may wish to update the application at some
              point. The application is currently available as per the
              requirements for the operating system (and for any additional
              systems they decide to extend the availability of the application
              to) may change, and you will need to download the updates if you
              want to continue using the application. The Service Provider does
              not guarantee that it will always update the application so that
              it is relevant to you and/or compatible with the particular
              operating system version installed on your device. However, you
              agree to always accept updates to the application when offered to
              you. The Service Provider may also wish to cease providing the
              application and may terminate its use at any time without
              providing termination notice to you. Unless they inform you
              otherwise, upon any termination, (a) the rights and licenses
              granted to you in these terms will end; (b) you must cease using
              the application, and (if necessary) delete it from your device.
            </p>

            <h2 className="text-xl font-bold text-[#0A2540] mt-8 mb-4">
              Changes to These Terms and Conditions
            </h2>
            <p>
              The Service Provider may periodically update their Terms and
              Conditions. Therefore, you are advised to review this page
              regularly for any changes. The Service Provider will notify you of
              any changes by posting the new Terms and Conditions on this page.
            </p>

            <p>
              <strong>These terms and conditions are effective as of 2026-04-14</strong>
            </p>

            <h2 className="text-xl font-bold text-[#0A2540] mt-8 mb-4">
              Contact Us
            </h2>
            <p>
              If you have any questions or suggestions about the Terms and
              Conditions, please do not hesitate to contact the Service Provider
              through our{" "}
              <a
                href="https://forms.gle/grHFMSrgpsNy7zAA8"
                className="text-[#00D4AA] hover:underline"
              >
                contact form
              </a>
              .
            </p>
            <p className="mt-4">
              For information about our licensing terms, please see our{" "}
              <Link href="/license" className="text-[#00D4AA] hover:underline">
                License
              </Link>
              .
            </p>

            <hr className="my-8 border-gray-200" />

          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
