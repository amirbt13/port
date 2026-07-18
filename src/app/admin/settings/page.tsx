import SettingsForm from "../_components/SettingsForm";
import { getSettings } from "@/lib/data/settings";

export const dynamic = "force-dynamic";

export default async function SettingsPage() {
  const settings = await getSettings();
  return (
    <div className="flex flex-col gap-6">
      <div>
        <p className="eyebrow">Profile</p>
        <h1 className="display-type mt-4 text-5xl leading-[0.9]">Personal information.</h1>
      </div>
      <SettingsForm settings={settings} />
    </div>
  );
}
