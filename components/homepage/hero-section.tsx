import { ArrowRight, Github } from 'lucide-react';
import Link from "next/link";
import { BorderBeam } from "../magicui/border-beam";
import { Button } from "../ui/button";
import Image from 'next/image';
import { TITLE_TAILWIND_CLASS } from '@/utils/constants';

export default function HeroSection() {
    return (
        <section className='flex flex-col items-center justify-center leading-6 mt-[3rem]' aria-label="Nextjs Starter Kit Hero">
            <h1 className={`${TITLE_TAILWIND_CLASS} scroll-m-20 font-bold tracking-tight text-center max-w-[1120px] bg-gradient-to-b dark:text-white`}>
                TAKE THE SHOT BECAUSE “SHE GOT BUCKETS”
            </h1>
            <p className="mx-auto max-w-[700px] text-gray-500 text-center mt-2 dark:text-gray-400">
                She Got Buckets is a non-profit organization that empowers women to achieve financial independence through education and support.
            </p>
        </section>
    )
}
