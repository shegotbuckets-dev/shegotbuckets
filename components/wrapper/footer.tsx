import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";

import { Instagram, Mail, Youtube } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

// Separate social media data into a constant
const SOCIAL_LINKS = [
    {
        icon: (
            <svg
                className="h-5 w-5"
                viewBox="0 0 512 512"
                xmlns="http://www.w3.org/2000/svg"
            >
                {/* WeChat SVG paths */}
                <path
                    d="M408.67 298.53a21 21 0 1 1 20.9-21 20.85 20.85 0 0 1-20.9 21m-102.17 0a21 21 0 1 1 20.9-21 20.84 20.84 0 0 1-20.9 21m152.09 118.86C491.1 394.08 512 359.13 512 319.51c0-71.08-68.5-129.35-154.41-129.35s-154.42 58.27-154.42 129.35 68.5 129.34 154.42 129.34c17.41 0 34.83-2.33 49.92-7 2.49-.86 3.48-1.17 4.64-1.17a16.67 16.67 0 0 1 8.13 2.34L454 462.83a11.62 11.62 0 0 0 3.48 1.17 5 5 0 0 0 4.65-4.66 14.27 14.27 0 0 0-.77-3.86c-.41-1.46-5-16-7.36-25.27a18.94 18.94 0 0 1-.33-3.47 11.4 11.4 0 0 1 5-9.35"
                    fill="currentColor"
                />
                <path
                    d="M246.13 178.51a24.47 24.47 0 0 1 0-48.94c12.77 0 24.38 11.65 24.38 24.47 1.16 12.82-10.45 24.47-24.38 24.47m-123.06 0A24.47 24.47 0 1 1 147.45 154a24.57 24.57 0 0 1-24.38 24.47M184.6 48C82.43 48 0 116.75 0 203c0 46.61 24.38 88.56 63.85 116.53C67.34 321.84 68 327 68 329a11.38 11.38 0 0 1-.66 4.49C63.85 345.14 59.4 364 59.21 365s-1.16 3.5-1.16 4.66a5.49 5.49 0 0 0 5.8 5.83 7.15 7.15 0 0 0 3.49-1.17L108 351c3.49-2.33 5.81-2.33 9.29-2.33a16.33 16.33 0 0 1 5.81 1.16c18.57 5.83 39.47 8.16 60.37 8.16h10.45a133.24 133.24 0 0 1-5.81-38.45c0-78.08 75.47-141 168.35-141h10.45C354.1 105.1 277.48 48 184.6 48"
                    fill="currentColor"
                />
            </svg>
        ),
        label: "公众号 WeChat",
        type: "popover" as const,
        qrCode: "https://mp.weixin.qq.com/mp/qrcode?scene=10000005&size=102&__biz=Mzg4ODgxNzcwMg==&mid=2247484703&idx=1&sn=2a0e7cd9883282d50127bb088493580c&send_time=",
    },
    {
        icon: (
            <svg
                className="h-5 w-5"
                viewBox="0 0 256 256"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M 29,0.33332825 C 13.959937,3.4666748 1.5356731,15.204498 0,31 -1.586103,47.314209 0,64.597672 0,81 v 102 c 0,18.76035 -4.7369685,44.19888 7.3333335,60 C 20.372129,260.06897 44.156731,256 63,256 h 111 35 c 5.78276,0 12.33244,0.84741 18,-0.33333 15.0401,-3.13336 27.46432,-14.87115 29,-30.66667 1.58612,-16.31419 0,-33.59769 0,-50 V 73 C 256,54.239685 260.73697,28.801102 248.66667,13 235.62787,-4.0689697 211.84329,0 193,0 H 82 47 C 41.217228,0 34.667561,-0.84741211 29,0.33332825 M 120,91 l -7,19 h 12 l -10,24 9,1 c -0.98794,2.68155 -2.31718,7.73317 -4.33334,9.83334 C 118.18945,146.3721 115.92654,146 114,146 c -4.35942,0 -13.16798,1.80539 -15.5,-3 -1.069664,-2.20416 0.465553,-4.98451 1.333336,-7 1.813624,-4.21228 4.222554,-8.51549 5.166664,-13 -2.17548,0 -4.92464,0.42967 -7,-0.33333 -7.778526,-2.85974 0.874031,-15.36435 2.66666,-19.66667 1.25875,-3.020981 2.75652,-9.584732 5.5,-11.5 C 110.01874,88.810822 115.88325,90.674988 120,91 m -79,63 c 2.750713,0 6.837379,0.81721 8.5,-2 1.769028,-2.99753 0.5,-9.58963 0.5,-13 V 106 C 50,102.90659 48.438198,93.464493 51.166668,91.5 53.41069,89.884308 62.832935,90.226166 63.833332,93 65.47065,97.539825 64,105.16241 64,110 v 32 c 0,5.48389 0.949112,11.8645 -1.333332,17 -2.177158,4.89861 -12.303417,9.27243 -17.333336,5.5 C 43.120155,162.84012 41.545292,156.59013 41,154 M 193,91 v 5 c 3.72887,0 8.4108,-0.763367 12,0.333328 11.97635,3.659424 11,15.422502 11,25.666672 1.99706,0 4.04419,-0.15562 6,0.33333 11.49335,2.87334 10,14.36401 10,23.66667 0,4.95615 0.93086,10.82184 -2.33333,15 -3.59567,4.60246 -9.48195,4 -14.66667,4 -1.6116,0 -4.26318,0.51051 -5.66667,-0.5 -2.62326,-1.88875 -3.78159,-7.50485 -4.33333,-10.5 3.28711,0 9.2179,1.12517 11.83333,-1.33334 C 219.9164,149.76859 218.65411,138.43454 215,136.5 c -1.93661,-1.02527 -4.88672,-0.5 -7,-0.5 h -15 v 29 h -14 v -29 h -14 v -14 h 14 v -12 h -9 V 96 h 9 v -5 h 14 m -32,5 v 14 h -8 v 42 h 13 v 13 H 120 L 125.33334,152.5 138,152 v -42 h -8 V 96 h 31 m 57,14 c 0,-2.84204 -0.51608,-6.25871 0.33333,-9 3.34434,-10.793121 19.61577,-2.093994 11.5,6.83333 -0.92279,1.01507 -2.54419,1.51106 -3.83333,1.83334 C 223.43948,110.30679 220.61993,110 218,110 M 41,110 36.833332,147 30,159 24,143 27,110 h 14 m 46,0 3,33 -6,15 h -2 c -5.366936,-8.49765 -6.053299,-17.26251 -7,-27 -0.672195,-6.91406 -2,-14.04004 -2,-21 h 14 m 106,0 v 12 h 9 v -12 h -9 m -75,42 -5,13 H 91 L 96.333336,151.5 104,151.66666 Z"
                    fill="currentColor"
                />
            </svg>
        ),
        label: "小红书 RED",
        href: "https://www.xiaohongshu.com/",
    },
    {
        icon: <Instagram className="h-5 w-5" />,
        label: "Instagram",
        href: "https://www.instagram.com/Shegotbuckets_Basketball",
    },
    {
        icon: <Youtube className="h-5 w-5" />,
        label: "YouTube",
        href: "https://www.youtube.com/@shegotbuckets",
    },
];

interface SocialLinkProps {
    link: {
        type?: "popover";
        icon: React.ReactNode;
        label: string;
        href?: string;
        qrCode?: string;
    };
}

const SocialLink = ({ link }: SocialLinkProps) => {
    if (link.type === "popover") {
        return (
            <Popover>
                <PopoverTrigger asChild>
                    <button className="text-muted-foreground transition hover:text-foreground flex items-center gap-2">
                        {link.icon}
                        <span>{link.label}</span>
                    </button>
                </PopoverTrigger>
                <PopoverContent
                    className="w-[500px] p-6"
                    side="right"
                    align="start"
                >
                    <div className="flex gap-6">
                        <div className="w-32 h-32 bg-[#f7f7f7] flex items-center justify-center">
                            {link.qrCode && (
                                <Image
                                    src={link.qrCode}
                                    alt="WeChat QR Code"
                                    width={96}
                                    height={96}
                                    className="object-contain"
                                />
                            )}
                        </div>
                        <div className="flex-1 min-w-0">
                            <h3 className="text-xl font-semibold mb-2">
                                She Got Buckets
                            </h3>
                            <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                                She Got Buckets
                                是一个由热爱篮球的女生们创建的为女生创造的篮球社区。我们的目标是为热爱篮球的中国女生，提供一个更好的比赛，交流和成长的平台。
                            </p>
                            <p className="text-sm text-muted-foreground">
                                44篇原创内容
                            </p>
                        </div>
                    </div>
                </PopoverContent>
            </Popover>
        );
    }

    if (link.href) {
        return (
            <Link
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground transition hover:text-foreground flex items-center gap-2"
            >
                {link.icon}
                <span>{link.label}</span>
            </Link>
        );
    }

    return null;
};

export default function Footer() {
    return (
        <footer className="bg-background">
            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                    <div>
                        <p className="font-medium text-foreground mb-4">
                            Socials
                        </p>
                        <ul className="space-y-4 text-sm">
                            {SOCIAL_LINKS.map((link, index) => (
                                <li key={index}>
                                    <SocialLink link={link} />
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <p className="font-medium text-foreground mb-4">
                            Contact Us
                        </p>
                        <div className="text-sm">
                            <Link
                                href="mailto:shegotbuckets@hotmail.com"
                                className="text-muted-foreground transition hover:text-foreground flex items-center gap-2"
                            >
                                <Mail className="h-5 w-5" />
                                <span>shegotbuckets@hotmail.com</span>
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="mt-6 border-t border-muted-foreground/10 pt-6">
                    <p className="text-xs text-muted-foreground">
                        &copy; {new Date().getFullYear()} She Got Buckets. All
                        Rights Reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
