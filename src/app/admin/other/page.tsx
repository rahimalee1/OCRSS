import AdminSectionImages from "../components/AdminSectionImages";
import { ADMIN_SECTIONS } from "../admin-sections";

const section = ADMIN_SECTIONS.find((s) => s.id === "other")!;

export default function AdminOtherPage() {
  return (
    <AdminSectionImages
      title={section.pageName}
      description={section.description}
      images={section.images}
    />
  );
}
