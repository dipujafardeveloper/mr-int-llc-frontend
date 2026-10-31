import Container from "@/components/container/Container";
import HowPrepWork from "./_components/HowPrepWork";
import PlPrepBanner from "./_components/PlPrepBanner";

export const metadata = {
    title: '3PL Prep Service',
    description: 'Here you can request 3PL prep services.',
}

export default function PlPrepServicePage() {
  return (
    <Container className="space-y-10 lg:space-y-16">
      <PlPrepBanner />
      <HowPrepWork />
    </Container>
  );
}
