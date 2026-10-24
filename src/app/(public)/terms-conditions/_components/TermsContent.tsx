import Container from "@/components/container/Container";

const introductoryParagraph =
  "Lorem ipsum dolor sit amet consectetur. Sed mattis blandit egestas tellus justo. Risus felis nulla cras mi. In aliquam nisl nunc non cras. Ultricies vitae tellus sagittis tincidunt vitae egestas consectetur scelerisque elementum. Nec tellus viverra nulla risus lacus pharetra egestas consectetur faucibus. Ornare amet consectetur mauris condimentum nisi sed facilisis. Amet in malesuada tellus sit nisl gravida lacus. Volutpat praesent eget nibh quam adipiscing velit. Ullamcorper lobortis pellentesque nullam arcu felis volutpat et. Mi elit bibendum molestie phasellus vitae lacus varius viverra tortor. Tellus ante arcu cras faucibus enim ut sed.";

const policyItems = [
  "Purus viverra erat hac nulla nunc pulvinar varius. Mattis at orci maecenas aliquet justo. Amet nibh commodo vestibulum imperdiet. In egestas sed consectetur sit dignissim faucibus ut metus et. Neque venenatis mauris urna integer fusce. Ut quam massa euismod et in id mi. Morbi ut amet ac lacus eu.",
  "Purus viverra erat hac nulla nunc pulvinar varius. Mattis at orci maecenas aliquet justo. Amet nibh commodo vestibulum imperdiet. In egestas sed consectetur sit dignissim faucibus ut metus et. Neque venenatis mauris urna integer fusce. Ut quam massa euismod et in id mi. Morbi ut amet ac lacus eu.",
  "Purus viverra erat hac nulla nunc pulvinar varius. Mattis at orci maecenas aliquet justo. Amet nibh commodo vestibulum imperdiet. In egestas sed consectetur sit dignissim faucibus ut metus et. Neque venenatis mauris urna integer fusce. Ut quam massa euismod et in id mi. Morbi ut amet ac lacus eu.",
  "Purus viverra erat hac nulla nunc pulvinar varius. Mattis at orci maecenas aliquet justo. Amet nibh commodo vestibulum imperdiet. In egestas sed consectetur sit dignissim faucibus ut metus et. Neque venenatis mauris urna integer fusce. Ut quam massa euismod et in id mi. Morbi ut amet ac lacus eu.",
];

export default function TermsContent() {
  return (
    <Container>
      <article className=" space-y-5 pb-12 text-sm leading-[1.35] text-[#555] sm:space-y-6 sm:text-base">
        <p className="text-center">{introductoryParagraph}</p>
        <p className="text-center">{introductoryParagraph}</p>

        <ol className="list-decimal space-y-2 pl-5">
          {policyItems.map((item, index) => (
            <li className="pl-1" key={index}>
              {item}
            </li>
          ))}
        </ol>

        <p className="text-center">{introductoryParagraph}</p>
      </article>
    </Container>
  );
}
