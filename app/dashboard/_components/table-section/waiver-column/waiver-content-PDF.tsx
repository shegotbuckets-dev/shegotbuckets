import {
    Document,
    Image,
    Page,
    StyleSheet,
    Text,
    View,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
    page: {
        flexDirection: "column",
        backgroundColor: "#ffffff",
        padding: 20,
    },
    section: {
        margin: 8,
        padding: 8,
    },
    title: {
        fontSize: 16,
        marginBottom: 10,
        fontWeight: "bold",
    },
    text: {
        fontSize: 10,
        marginBottom: 10,
    },
    bold: {
        fontWeight: "bold",
    },
    headline: {
        textAlign: "center",
        fontSize: 20,
        marginBottom: 10,
        fontWeight: "bold",
    },
    signatureImage: {
        width: 200,
        height: 50,
    },
    signatureSection: {
        marginTop: 50,
        borderTopWidth: 1,
        borderTopColor: "#000000",
        paddingTop: 10,
    },
});

interface WaiverContentPDFProps {
    firstName: string;
    lastName: string;
    signatureDataUrl: string;
    timestamp: string;
}

export const WaiverContentPDF = ({
    firstName,
    lastName,
    signatureDataUrl,
    timestamp,
}: WaiverContentPDFProps) => (
    <Document>
        <Page size="A4" style={styles.page}>
            <View style={styles.section}>
                <Text style={styles.bold}>Legal First Name: {firstName}</Text>
                <Text style={styles.bold}>Legal Last Name: {lastName}</Text>

                <Text style={styles.text}></Text>

                <Text style={styles.headline}>
                    PUBLICITY WAIVER AND RELEASE
                </Text>
                <Text style={styles.text}>
                    She Got Buckets (&quot;SGB&ldquo;), a non-profit
                    organization with an office located in Long Island City, NY,
                    desires to use and publicize the name, likeness, and other
                    personal characteristics and private information of the
                    individual named below with a residence at the address set
                    out below (&quot;I&ldquo; or &quot;me&ldquo;) for
                    advertising, promotion, and other non-commercial purposes. I
                    hereby acknowledge I give SGB my permission for such use and
                    publicity for such purposes, according to the terms and
                    conditions set forth in this Publicity Waiver and Release
                    (&quot;Agreement&ldquo;).
                </Text>

                <Text style={styles.title}>Preamble</Text>
                <Text style={styles.text}>
                    I hereby irrevocably permit, authorize, grant, and license
                    SGB and its affiliates, successors, and assigns, and their
                    respective licensees, advertising agencies, promotion
                    agencies, and fulfillment agencies, and the employees,
                    officers, directors, and agents of each and all of them
                    (&quot;Authorized Persons&ldquo;), the rights to display,
                    publicly perform, exhibit, transmit, broadcast, reproduce,
                    record, photograph, digitize, modify, alter, edit, adapt,
                    create derivative works, exploit, sell, rent, license,
                    otherwise use, and permit others to use, my name, image,
                    likeness, appearance, voice, professional and personal
                    biographical information, signature, other personal
                    characteristics and private information, and all materials
                    created by or on behalf of SGB that incorporate any of the
                    foregoing (&quot;Materials&ldquo;) in perpetuity throughout
                    the universe in any medium or format whatsoever now existing
                    or hereafter created, including but not limited to, in and
                    on magazines, brochures, and other print publications,
                    electronic, magnetic, and optical media, motion pictures,
                    television broadcast, cablecast, and satellite, home video
                    and video on demand, radio broadcasts, display,
                    point-of-sale, and other advertising and promotional
                    materials, press releases, the internet and other digital
                    transmission or delivery methods, and mobile applications,
                    on any platform and for any purpose, including but not
                    limited to advertising, public relations, publicity,
                    packaging, and promotion of SGB and its affiliates and their
                    businesses, products, and services, without further consent
                    from or royalty, payment, or other compensation to me except
                    as otherwise expressly provided in this Agreement.
                </Text>

                <Text style={styles.title}>
                    Consent to Use Name and Likeness
                </Text>
                <Text style={styles.text}>
                    SGB shall be the exclusive owner of all rights, including
                    copyright, in the Materials. I hereby irrevocably transfer,
                    assign, and otherwise convey to SGB my entire right, title,
                    and interest, if any, in and to the Materials and all
                    copyrights and other intellectual property rights in the
                    Materials arising in any jurisdiction throughout the
                    universe in perpetuity, including all registration, renewal,
                    and reversion rights, and the right to sue to enforce such
                    copyrights against infringers. I acknowledge and agree that
                    I have no right to review or approve Materials before they
                    are used by SGB, and that SGB has no liability to me for any
                    editing or alteration of the Materials or for any distortion
                    or other effects resulting from SGB&apos;s editing,
                    alteration, or use of the Materials, or SGB&apos;s
                    presentation of me. Any credit or other acknowledgment of
                    me, if any, shall be determined by SGB in SGB&apos;s sole
                    discretion. SGB has no obligation to create or use the
                    Materials or to exercise any rights given by this Agreement.
                </Text>

                <Text style={styles.title}>
                    Ownership and Control of Materials
                </Text>
                <Text style={styles.text}>
                    To the fullest extent permitted by applicable law, I hereby
                    irrevocably waive all legal and equitable rights relating to
                    all liabilities, claims, demands, actions, suits, damages,
                    and expenses, including but not limited to claims for
                    copyright or trademark infringement, infringement of moral
                    rights, libel, defamation, invasion of any rights of privacy
                    (including intrusion, false light, public disclosure of
                    private facts, and misappropriation of name or likeness),
                    violation of rights of publicity, physical or emotional
                    injury or distress, or any similar claim or cause of action
                    in tort, contract, or any other legal theory, now known or
                    hereafter known in any jurisdiction throughout the world
                    (collectively, &quot;Claims&rdquo;), arising directly or
                    indirectly from the Authorized Persons exercise of their
                    rights under this Agreement or the production, exhibition,
                    exploitation, advertising, promotion, or other use of the
                    Materials, and whether resulting in whole or in part from
                    the negligence of SGB or any other person, and I hereby
                    covenant not to make or bring any such Claim against any
                    Authorized Persons and forever release and discharge the
                    Authorized Persons from liability under such Claims. I
                    understand that SGB is relying on this Agreement and will
                    incur significant expense in reliance on this Agreement, and
                    I agree that this Agreement cannot be terminated, rescinded,
                    or modified in whole or in part.
                </Text>

                <Text style={styles.title}>
                    Waiver of Rights and Release of Claims
                </Text>
                <Text style={styles.text}>
                    I represent and warrant to SGB that I am at least eighteen
                    (18) years of age, and I have full right, power, and
                    authority to enter into this Agreement and grant the rights
                    granted hereunder. I further represent and warrant to SGB
                    that I will provide only true and correct statements and
                    other information in connection with this Agreement, and the
                    Authorized Persons use of the Materials and the rights and
                    license granted hereunder do not, and will not, violate any
                    right (including without limitation copyright, trademark,
                    trade secret, right to privacy, or right of publicity) of,
                    or conflict with or violate any contract with or commitment
                    made to, any person or entity, and that no consent or
                    authorization from, or any payment to, any third party is
                    required in connection herewith. I agree to defend,
                    indemnify, and hold harmless the Authorized Persons from and
                    against all Claims by third parties resulting from my breach
                    or alleged breach of this Agreement or any of the foregoing
                    representations and warranties.
                </Text>

                <Text style={styles.title}>
                    Representations and Warranties, Indemnification
                </Text>
                <Text style={styles.text}>
                    This Agreement constitutes the sole and entire agreement of
                    the parties with respect to the subject matter contained
                    herein and supersedes all prior and contemporaneous
                    understandings, agreements, representations, and warranties,
                    both written and oral, with respect to such subject matter.
                    I have not relied on any statement, representation,
                    warranty, or agreement of SGB or of any other person on
                    SGB&apos;s behalf, including any representations,
                    warranties, or agreements arising from statute or otherwise
                    in law, except for the representations, warranties, or
                    agreements expressly contained in this Agreement. If any
                    term or provision of this Agreement is invalid, illegal, or
                    unenforceable in any jurisdiction, such invalidity,
                    illegality, or unenforceability will not affect any other
                    term or provision of this Agreement or invalidate or render
                    unenforceable such term or provision in any other
                    jurisdiction. SGB may assign this Agreement and its rights
                    hereunder, in whole or in part, to any party. This Agreement
                    is binding on and inures to my benefit and the benefit of
                    SGB and our respective heirs, executors, administrators,
                    legal representatives, successors, and permitted assigns.
                    All matters arising out of or relating to this Agreement
                    shall be governed by and construed in accordance with the
                    internal laws of the State of New York without giving effect
                    to any choice or conflict of law provision or rule (whether
                    of the State of New York or any other jurisdiction). I
                    hereby irrevocably consent to the exclusive jurisdiction of
                    such courts.
                </Text>

                <Text style={styles.text}>
                    I AM AWARE AND UNDERSTAND THAT THE ACTIVITY IS AN INHERENTLY
                    AND/OR POTENTIALLY DANGEROUS ACTIVITY AND INVOLVE THE RISK
                    OF SERIOUS INJURY, DISABILITY, DEATH, AND/OR PROPERTY
                    DAMAGE. I ACKNOWLEDGE THAT ANY INJURIES THAT I SUSTAIN MAY
                    RESULT FROM OR BE COMPOUNDED BY NEGLIGENT EMERGENCY RESPONSE
                    OR RESCUE OPERATIONS OF SGB. NOTWITHSTANDING THE RISK, I
                    ACKNOWLEDGE THAT I AM KNOWINGLY AND VOLUNTARILY
                    PARTICIPATING IN THE ACTIVITIES WITH AN EXPRESS
                    UNDERSTANDING OF THE DANGER INVOLVED AND HEREBY AGREE TO
                    ACCEPT AND ASSUME ANY AND ALL RISKS OF INJURY, DISABILITY,
                    DEATH, AND/OR PROPERTY DAMAGE ARISING FROM MY PARTICIPATION
                    IN] THE ACTIVITY, WHETHER CAUSED BY THE ORDINARY NEGLIGENCE
                    OF SGB OR OTHERWISE, INCLUDING BUT NOT LIMITED TO ANY RISKS
                    THAT MAY ARISE FROM NEGLIGENCE OR CARELESSNESS ON THE PART
                    OF THE PERSONS OR ENTITIES BEING RELEASED, FROM DANGEROUS OR
                    DEFECTIVE EQUIPMENT OR PROPERTY OWNED, MAINTAINED, OR
                    CONTROLLED BY THEM, OR BECAUSE OF THEIR POSSIBLE LIABILITY
                    WITHOUT FAULT.
                </Text>

                <Text style={styles.text}>
                    I hereby expressly waive and release any and all claims, now
                    known or hereafter known, against SGB, and its officers,
                    directors, manager(s), employees, agents, affiliates,
                    members, successors, and assigns (collectively,
                    “Releasees”), on account of injury, disability, death, or
                    property damage arising out of or attributable to my
                    participation in the Activity, whether arising out of the
                    ordinary negligence of SGB or any Releasees or otherwise. I
                    covenant not to make or bring any such claim against SGB or
                    any other Releasee, and forever release and discharge SGB
                    and all other Releasees from liability under such claims.
                </Text>
                <Text style={styles.text}>
                    I certify that I am physically fit, have sufficiently
                    prepared or trained for participation in the activity or
                    event, and have not been advised to not participate by a
                    qualified medical professional. I certify that there are no
                    health-related reasons or problems which preclude my
                    participation in this activity or event.
                </Text>
                <Text style={styles.text}>
                    I shall defend, indemnify, and hold harmless SGB and all
                    other Releasees against any and all losses, damages,
                    liabilities, deficiencies, claims, actions, judgments,
                    settlements, interest, awards, penalties, fines, costs, or
                    expenses of whatever kind, including reasonable attorney
                    fees, fees, the costs of enforcing any right to
                    indemnification under this Agreement, and the cost of
                    pursuing any insurance providers, incurred by/awarded
                    against SGB or any other Releasees in a final non-appealable
                    judgment, arising out of or resulting from any claim of a
                    third party related to my participation in the Activity ,
                    including any claim related to my own negligence or the
                    ordinary negligence of SGB.
                </Text>
                <Text style={styles.text}>
                    I hereby consent to receive medical treatment deemed
                    necessary if I am injured or require medical attention
                    during my participation in the Activity. I understand and
                    agree that I am solely responsible for all costs related to
                    such medical treatment and any related medical
                    transportation and/or evacuation. I hereby release, forever
                    discharge, and hold harmless SGB from any claim based on
                    such treatment or other medical services.
                </Text>
                <Text style={styles.text}>
                    This Release constitutes the sole and entire agreement of
                    SGB and me with respect to the subject matter contained
                    herein and supersedes all prior and contemporaneous
                    understandings, agreements, representations, and warranties,
                    both written and oral, with respect to such subject matter.
                    If any term or provision of this Release is invalid,
                    illegal, or unenforceable in any jurisdiction, such
                    invalidity, illegality, or unenforceability shall not affect
                    any other term or provision of this Release or invalidate or
                    render unenforceable such term or provision in any other
                    jurisdiction. This Release is binding on and shall inure to
                    the benefit of SGB and me and their respective successors
                    and assigns. All matters arising out of or relating to the
                    making or performance of this Release whether sounding in
                    contract, tort or statute shall be governed by and construed
                    in accordance with and enforced under the internal laws of
                    the State of New York (including [its statute of limitations
                    and N.Y. Gen. Oblig. Law § 5-1401) without giving effect to
                    any choice or conflict of law provisions thereof to the
                    extent such principles or rules would require or permit the
                    application of the laws of any jurisdiction other than those
                    of the State of New York. Any claim or cause of action
                    arising under this Release may be brought only in the
                    federal and state courts located in New York County, New
                    York and I hereby consent to the exclusive jurisdiction of
                    such courts.
                </Text>

                <Text style={styles.title}>COVID-19 PREVENTION GUIDELINES</Text>
                <Text style={styles.text}>
                    I OBEY COVID-19 PREVENTION GUIDELINES REQUIRED BY THE New
                    York State of Health and adapted by including the following
                    actions: do not appear on the game site if sick, take
                    temperature test, and provide proof of vaccination upon each
                    day.
                </Text>
                <Text style={styles.text}>
                    Guidelines from the New York State of Health may be found
                    here: https://nystateofhealth.ny.gov/
                </Text>
                <Text style={styles.text}>
                    We hereby advise you that COVID‐19 is a highly contagious
                    virus and any offline interaction with other users or third
                    parties carries a risk of developing or contracting
                    COVID‐19. As such, by participating in the Activities, you
                    expressly assume such risk. In further consideration of
                    being permitted to participate in the games and as material
                    inducement therefor, you agree to the following waiver,
                    release, covenant and indemnity: (i) On your behalf and on
                    behalf of all your invitees, you hereby release, waive,
                    discharge and covenant not to sue the entities or persons
                    mentioned in section (A) , its third party sports facilities
                    providers, its director, officers, employees, volunteers,
                    agents from all liability to the undersigned or your
                    invitees for any loss damage or any claim on account of
                    injury to or illness or death relating to COVID‐19, directly
                    or indirectly, from you whether caused by negligence, active
                    or passive, of the entities or persons mentioned in section
                    (A), or otherwise while the undersigned are participating in
                    the Games, and (ii) you shall indemnify, defend, and hold
                    harmless the entities or persons mentioned in section (A) ,
                    its third party sports facilities providers, its directors,
                    officers, employees, volunteers, and agents and each of
                    them, from any loss, liability, damage or costs, whether
                    caused by negligence of the entities or persons mentioned in
                    section (A) or otherwise, and whether brought by you, your
                    invitees, or unrelated third parties, while you or any of
                    your invitees are in, upon or about the Space and shall
                    indemnify, defend, and hold harmless the entities or persons
                    mentioned in section (A) .
                </Text>
                <Text style={styles.text}>
                    You agree to adhere to all facility protocols related to
                    COVID-19 and other safety guidelines. These guidelines are
                    non‐negotiable. You understand that these guidelines and
                    safety protocols may change over time and you agree to
                    adhere to any changes to the guidelines and protocols.
                </Text>
            </View>

            <View style={styles.signatureSection}>
                <Text style={styles.text}>Date Signed: {timestamp}</Text>
                <Text style={styles.text}>Signature:</Text>
                <Image style={styles.signatureImage} src={signatureDataUrl} />
            </View>
        </Page>
    </Document>
);
