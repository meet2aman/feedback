import Image from "next/image";
import React from "react";

const Footer = () => {
  return (
    <main className="relative z-20 -mt-[9vh] overflow-hidden border-t border-neutral-800 bg-black">
      <div
        aria-hidden="true"
        className="left-1/2 top-0 w-[40%] user-select-none center pointer-events-none absolute h-px max-w-full -translate-x-1/2 -translate-y-1/2"
        style={{
          background:
            "linear-gradient(90deg, rgba(0, 0, 0, 0) 0%, rgba(255, 255, 255, 0.0) 0%, rgba(143, 143, 143, 0.67) 50%, rgba(0, 0, 0, 0) 100%)",
        }}
      ></div>
      <div
        aria-hidden="true"
        className="-top-1 left-1/2 h-[100px] w-[70%] md:h-[300px] user-select-none center pointer-events-none absolute max-w-full -translate-x-1/2 -translate-y-1/2"
        style={{
          background:
            "conic-gradient(from 90deg at 50% 50%, #00000000 50%, #000 50%),radial-gradient(rgba(200,200,200,0.1) 0%, transparent 80%)",
        }}
      ></div>
      <section className="mx-auto max-w-5xl px-6 py-36 md:max-w-7xl text-white">
        <div className="flex w-full flex-col gap-8 sm:flex-row">
          <div className="flex w-full flex-row sm:w-1/3 sm:flex-col">
            <div className="flex w-full flex-col gap-8 sm:mb-8">
              <Image
                src={"/feedback.png"}
                alt="logo"
                width={300}
                height={100}
              />
            </div>
            <div className="flex w-full gap-4">
              <a
                className="outline-none transition duration-150 ease-in-out focus-visible:ring-2 focus-visible:ring-slate-7 rounded-full"
                rel="noreferrer"
                target="_blank"
                href="https://x.com/amankushwaha200"
              >
                <img
                  alt="Twitter"
                  loading="lazy"
                  width="32"
                  height="32"
                  decoding="async"
                  data-nimg="1"
                  style={{ color: "transparent" }}
                  src="https://resend.com/static/footer-twitter.svg"
                />
              </a>
              <a
                className="outline-none transition duration-150 ease-in-out focus-visible:ring-2 focus-visible:ring-slate-7 rounded-full"
                rel="noreferrer"
                target="_blank"
                href="https://github.com/meet2aman"
              >
                <img
                  alt="GitHub"
                  loading="lazy"
                  width="32"
                  height="32"
                  decoding="async"
                  data-nimg="1"
                  style={{ color: "transparent" }}
                  src="https://resend.com/static/footer-github.svg"
                />
              </a>
              <a
                className="outline-none transition duration-150 ease-in-out focus-visible:ring-2 focus-visible:ring-slate-7 rounded-full"
                rel="noreferrer"
                target="_blank"
                href="https://www.linkedin.com/in/aman-kushwaha-79b3b5253/"
              >
                <img
                  alt="LinkedIn"
                  loading="lazy"
                  width="32"
                  height="32"
                  decoding="async"
                  data-nimg="1"
                  style={{ color: "transparent" }}
                  src="https://resend.com/static/footer-linkedin.svg"
                />
              </a>
            </div>
          </div>
          <div className="grid w-full grid-cols-2 gap-8 sm:w-2/3 lg:grid-cols-4">
            <div className="flex flex-col gap-4">
              <p className="mb-2 ml-1.5 text-sm text-slate-12 font-normal">
                Documentation
              </p>
              <ul>
                <li>
                  <a
                    className="outline-none transition duration-150 ease-in-out focus-visible:ring-2 focus-visible:ring-slate-7 rounded-md px-1 py-0.5 text-sm text-slate-11  hover:text-slate-12 focus-visible:text-slate-12"
                    href="/docs/introduction"
                  >
                    Getting Started
                  </a>
                </li>
              </ul>
              <ul>
                <li>
                  <a
                    className="outline-none transition duration-150 ease-in-out focus-visible:ring-2 focus-visible:ring-slate-7 rounded-md px-1 py-0.5 text-sm text-slate-11  hover:text-slate-12 focus-visible:text-slate-12"
                    href="/docs/api-reference/introduction"
                  >
                    API Reference
                  </a>
                </li>
              </ul>
              <ul>
                <li>
                  <a
                    className="outline-none transition duration-150 ease-in-out focus-visible:ring-2 focus-visible:ring-slate-7 rounded-md px-1 py-0.5 text-sm text-slate-11  hover:text-slate-12 focus-visible:text-slate-12"
                    href="/docs/integrations"
                  >
                    Integrations
                  </a>
                </li>
              </ul>
              <ul>
                <li>
                  <a
                    className="outline-none transition duration-150 ease-in-out focus-visible:ring-2 focus-visible:ring-slate-7 rounded-md px-1 py-0.5 text-sm text-slate-11  hover:text-slate-12 focus-visible:text-slate-12"
                    href="/docs/examples"
                  >
                    Examples
                  </a>
                </li>
              </ul>
              <ul>
                <li>
                  <a
                    className="outline-none transition duration-150 ease-in-out focus-visible:ring-2 focus-visible:ring-slate-7 rounded-md px-1 py-0.5 text-sm text-slate-11  hover:text-slate-12 focus-visible:text-slate-12"
                    href="/docs/sdks"
                  >
                    SDKs
                  </a>
                </li>
              </ul>
            </div>
            <div className="flex flex-col gap-4">
              <p className="mb-2 ml-1.5 text-sm text-slate-12 font-normal">
                Resources
              </p>
              <ul>
                <li>
                  <a
                    className="outline-none transition duration-150 ease-in-out focus-visible:ring-2 focus-visible:ring-slate-7 rounded-md px-1 py-0.5 text-sm text-slate-11  hover:text-slate-12 focus-visible:text-slate-12"
                    href="/changelog"
                  >
                    Changelog
                  </a>
                </li>
              </ul>
              <ul>
                <li>
                  <a
                    className="outline-none transition duration-150 ease-in-out focus-visible:ring-2 focus-visible:ring-slate-7 rounded-md px-1 py-0.5 text-sm text-slate-11  hover:text-slate-12 focus-visible:text-slate-12"
                    href="/pricing"
                  >
                    Pricing
                  </a>
                </li>
              </ul>
              <ul>
                <li>
                  <a
                    className="outline-none transition duration-150 ease-in-out focus-visible:ring-2 focus-visible:ring-slate-7 rounded-md px-1 py-0.5 text-sm text-slate-11  hover:text-slate-12 focus-visible:text-slate-12"
                    href="/security"
                  >
                    Security
                  </a>
                </li>
              </ul>
              <ul>
                <li>
                  <a
                    className="outline-none transition duration-150 ease-in-out focus-visible:ring-2 focus-visible:ring-slate-7 rounded-md px-1 py-0.5 text-sm text-slate-11 hover:text-slate-12 focus-visible:text-slate-12"
                    href="/security/soc-2"
                  >
                    SOC 2
                  </a>
                </li>
              </ul>
              <ul>
                <li>
                  <a
                    className="outline-none transition duration-150 ease-in-out focus-visible:ring-2 focus-visible:ring-slate-7 rounded-md px-1 py-0.5 text-sm text-slate-11  hover:text-slate-12 focus-visible:text-slate-12"
                    href="/status"
                  >
                    Status
                  </a>
                </li>
              </ul>
              <ul>
                <li>
                  <a
                    className="outline-none transition duration-150 ease-in-out focus-visible:ring-2 focus-visible:ring-slate-7 rounded-md px-1 py-0.5 text-sm text-slate-11  hover:text-slate-12 focus-visible:text-slate-12"
                    href="/brand"
                  >
                    Brand
                  </a>
                </li>
              </ul>
            </div>
            <div className="flex flex-col gap-4">
              <p className="mb-2 ml-1.5 text-sm text-slate-12 font-normal">
                Company
              </p>
              <ul>
                <li>
                  <a
                    className="outline-none transition duration-150 ease-in-out focus-visible:ring-2 focus-visible:ring-slate-7 rounded-md px-1 py-0.5 text-sm text-slate-11  hover:text-slate-12 focus-visible:text-slate-12"
                    href="/about"
                  >
                    About
                  </a>
                </li>
              </ul>
              <ul>
                <li>
                  <a
                    className="outline-none transition duration-150 ease-in-out focus-visible:ring-2 focus-visible:ring-slate-7 rounded-md px-1 py-0.5 text-sm text-slate-11 hover:text-slate-12 focus-visible:text-slate-12"
                    href="/blog"
                  >
                    Blog
                  </a>
                </li>
              </ul>
              <ul>
                <li>
                  <a
                    className="outline-none transition duration-150 ease-in-out focus-visible:ring-2 focus-visible:ring-slate-7 rounded-md px-1 py-0.5 text-sm text-slate-11 hover:text-slate-12 focus-visible:text-slate-12"
                    href="/careers"
                  >
                    Careers
                  </a>
                </li>
              </ul>
              <ul>
                <li>
                  <a
                    className="outline-none transition duration-150 ease-in-out focus-visible:ring-2 focus-visible:ring-slate-7 rounded-md px-1 py-0.5 text-sm text-slate-11  hover:text-slate-12 focus-visible:text-slate-12"
                    href="/contact"
                  >
                    Contact
                  </a>
                </li>
              </ul>
              <ul>
                <li>
                  <a
                    className="outline-none transition duration-150 ease-in-out focus-visible:ring-2 focus-visible:ring-slate-7 rounded-md px-1 py-0.5 text-sm text-slate-11 hover:text-slate-12 focus-visible:text-slate-12"
                    href="/customers"
                  >
                    Customers
                  </a>
                </li>
              </ul>
              <ul>
                <li>
                  <a
                    className="outline-none transition duration-150 ease-in-out focus-visible:ring-2 focus-visible:ring-slate-7 rounded-md px-1 py-0.5 text-sm text-slate-11  hover:text-slate-12 focus-visible:text-slate-12"
                    href="/philosophy"
                  >
                    Philosophy
                  </a>
                </li>
              </ul>
            </div>
            <div className="flex flex-col gap-4">
              <p className="mb-2 ml-1.5 text-sm text-slate-12 font-normal">
                Legal
              </p>
              <ul>
                <li>
                  <a
                    className="outline-none transition duration-150 ease-in-out focus-visible:ring-2 focus-visible:ring-slate-7 rounded-md px-1 py-0.5 text-sm text-slate-11 hover:text-slate-12 focus-visible:text-slate-12"
                    href="/legal/acceptable-use"
                  >
                    Acceptable Use
                  </a>
                </li>
              </ul>
              <ul>
                <li>
                  <a
                    className="outline-none transition duration-150 ease-in-out focus-visible:ring-2 focus-visible:ring-slate-7 rounded-md px-1 py-0.5 text-sm text-slate-11  hover:text-slate-12 focus-visible:text-slate-12"
                    href="/legal/privacy-policy"
                  >
                    Privacy Policy
                  </a>
                </li>
              </ul>
              <ul>
                <li>
                  <a
                    className="outline-none transition duration-150 ease-in-out focus-visible:ring-2 focus-visible:ring-slate-7 rounded-md px-1 py-0.5 text-sm text-slate-11 hover:text-slate-12 focus-visible:text-slate-12"
                    href="/legal/terms-of-service"
                  >
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Footer;
