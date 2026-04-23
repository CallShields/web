import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Link from "next/link";

export default function LicensePage() {
  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      <Navbar />
      <main className="container mx-auto px-4 py-16 max-w-4xl">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-12">
          <h1 className="text-3xl font-bold text-[#0A2540] mb-8">
            Open Source License
          </h1>

          <div className="prose prose-sm max-w-none text-[#64748B] space-y-6">
            <section>
              <p>
                CallShields is licensed under a modified version of the GNU Affero General Public License v3.0 (AGPL-3.0), with the following additional conditions:
              </p>
            </section>

            <hr className="my-8 border-gray-200" />

            <section>
              <h2 className="text-xl font-bold text-[#0A2540] mt-8 mb-4">
                1. Commercial Use Conditions
              </h2>
              <p className="mb-4">
                CallShields may be utilized commercially, including as a backend service for other applications or as an application development platform for enterprises. Should the conditions below be met, a commercial license must be obtained from the producer:
              </p>

              <div className="ml-4 mt-4">
                <h3 className="font-semibold text-[#0A2540] mb-2">a. Multi-tenant service</h3>
                <p className="mb-2">Unless explicitly authorized by CallShields in writing, you may not use the CallShields source code to operate a multi-tenant environment.</p>
                <p className="text-sm italic text-[#94A3B8]">
                  <strong>Tenant Definition:</strong> Within the context of CallShields, one tenant corresponds to one workspace. The workspace provides a separated area for each tenant's data and configurations.
                </p>

                <h3 className="font-semibold text-[#0A2540] mb-2 mt-4">b. LOGO and copyright information</h3>
                <p className="mb-2">In the process of using CallShields's frontend, you may not remove or modify the LOGO or copyright information in the CallShields console or applications. This restriction is inapplicable to uses of CallShields that do not involve its frontend.</p>
                <p className="text-sm italic text-[#94A3B8]">
                  <strong>Frontend Definition:</strong> For the purposes of this license, the "frontend" of CallShields includes all web-based components, mobile app interfaces, and user-facing components of the application.
                </p>
              </div>
            </section>

            <hr className="my-8 border-gray-200" />

            <section>
              <h2 className="text-xl font-bold text-[#0A2540] mt-8 mb-4">
                2. Contributor Agreement
              </h2>
              <p className="mb-4">As a contributor, you should agree that:</p>

              <div className="ml-4 mt-4">
                <ul className="list-disc ml-6 space-y-2">
                  <li>
                    <strong>a.</strong> The producer can adjust the open-source agreement to be more strict or relaxed as deemed necessary.
                  </li>
                  <li>
                    <strong>b.</strong> Your contributed code may be used for commercial purposes, including but not limited to its cloud business operations.
                  </li>
                </ul>
              </div>
            </section>

            <hr className="my-8 border-gray-200" />

            <section>
              <h2 className="text-xl font-bold text-[#0A2540] mt-8 mb-4">
                AGPL-3.0 License
              </h2>
              <p className="mb-4">
                Apart from the specific conditions mentioned above, all other rights and restrictions follow the GNU Affero General Public License v3.0 (AGPL-3.0). Detailed information about the AGPL-3.0 can be found at{" "}
                <a 
                  href="https://www.gnu.org/licenses/agpl-3.0.html" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-[#00D4AA] hover:underline"
                >
                  https://www.gnu.org/licenses/agpl-3.0.html
                </a>
                .
              </p>
            </section>

            <hr className="my-8 border-gray-200" />

            <section>
              <p className="text-sm text-[#94A3B8]">
                © 2026 CallShields
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
