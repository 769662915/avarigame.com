import { Locale } from "@/i18n/routing";
import { redirect } from "next/navigation";
import { getGame } from "@/actions";

interface Props {
  params: {
    locale: Locale;
    id: string;
  };
  searchParams: Record<string, string>;
}
export default async function Page({
  params: { id, locale },
}: Props) {
  const { gameUrl } = await getGame(locale, id);

  redirect(gameUrl);
}
