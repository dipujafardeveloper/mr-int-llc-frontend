import SectionTitle from "@/components/shared/section/SectionTitle"
import FAQContainer from "./_components/FAQContainer";

export const metadata = {
    title: 'FAQ',
    description: 'Discover products from around the world with MR International — global shopping, made simple.',
}

export default function FAQPage() {
  return (
    <div className="page-padding">

      <SectionTitle title="Frequently Asked Questions"  subTitle="Got questions? We’ve got answers. Here’s everything you need to know about our app." />
      <FAQContainer />
    </div>
  )
}
