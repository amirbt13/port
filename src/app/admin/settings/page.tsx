import SettingsForm from "../_components/SettingsForm";
import { getSettings } from "@/lib/data/settings";

export const dynamic = "force-dynamic";

export default async function SettingsPage() {
  const settings = await getSettings();
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-semibold">Personal info</h1>
      <SettingsForm settings={settings} />
    </div>
  );
}
