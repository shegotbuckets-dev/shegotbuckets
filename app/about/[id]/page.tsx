import { getMediaUrl } from "@/lib/utils";
import { fetchMemberDetailById } from "@/utils/actions/supabase";
import { SupabaseStorageBucket } from "@/utils/types";

import { Metadata } from "next";

import { MemberDetailPage } from "../_components/about-member-detail";

// Assuming this function exists

export async function generateMetadata({
    params,
}: {
    params: { id: string };
}): Promise<Metadata> {
    // Fetch the member data
    const member = await fetchMemberDetailById(params.id).catch(() => null);

    // Default metadata if member not found
    if (!member) {
        return {
            title: "Team Member",
            description: "Learn about our team member at She Got Buckets.",
        };
    }

    // Member-specific metadata
    return {
        title: `${member.name}`,
        description:
            `Learn about ${member.name}, ${member.title} at She Got Buckets. ${member.description || ""}`.substring(
                0,
                160
            ),
        openGraph: {
            title: `${member.name} - She Got Buckets Org Member`,
            description: `Learn about ${member.name}, ${member.title} at She Got Buckets.`,
            images:
                member.image_url && member.image_url.length > 0
                    ? [
                          getMediaUrl(
                              SupabaseStorageBucket.MEMBERS,
                              member.image_url ?? ""
                          ),
                      ]
                    : ["/images/sgb-together.png"],
        },
    };
}

export default function AboutMemberPage({
    params,
}: {
    params: { id: string };
}) {
    return (
        <main>
            <MemberDetailPage params={params} />
        </main>
    );
}
