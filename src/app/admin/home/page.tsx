import AdminSectionImages from "../components/AdminSectionImages";
import { ADMIN_SECTIONS } from "../admin-sections";

const section = ADMIN_SECTIONS.find((s) => s.id === "home")!;

export default function AdminHomePage() {
  return (
    <AdminSectionImages
      title={section.pageName}
      description={section.description}
      images={section.images}
    />
  );
}
