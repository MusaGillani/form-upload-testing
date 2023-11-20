import { text, integer, sqliteTable, blob } from "drizzle-orm/sqlite-core";

export const files = sqliteTable("files", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  fileName: text("fileName"),
  file: blob("file"),
});
