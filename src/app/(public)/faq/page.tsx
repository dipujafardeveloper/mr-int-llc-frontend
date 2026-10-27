import Container from "@/components/container/Container";
import FAQContainer from "./_components/FAQContainer";
import PageSectionTitle from "@/components/shared/section/PageSectionTitle";

export const metadata = {
    title: 'FAQ',
    description: 'Discover products from around the world with MR International — global shopping, made simple.',
}

export default function FAQPage() {
  return (
    <Container className="page-padding">

      <PageSectionTitle title="Frequently Asked Questions"  subTitle="Got questions? We’ve got answers. Here’s everything you need to know about our app." />
      <FAQContainer />
    </Container>
  )
}
