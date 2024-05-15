import { z } from "zod";
import { fields_api } from "..";
import { Field, FieldSchema } from "./fields.model";

export async function getFields(): Promise<Field[]> {
  const res = await fields_api.get("/fields");
  const fields = z.array(FieldSchema).parse(res.data);

  return fields;
}