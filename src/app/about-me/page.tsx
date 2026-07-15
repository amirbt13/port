import AboutMePage from "@/components/pages/AboutMePage";
import { getSettings } from "@/lib/data/settings";

export const dynamic = "force-dynamic";

const AboutMe = async () => {
  const settings = await getSettings();
  return <AboutMePage settings={settings} />;
};

export default AboutMe;
