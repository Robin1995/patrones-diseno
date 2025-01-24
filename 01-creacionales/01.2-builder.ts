/**
 * ! Patrón Builder:
 * Es un patrón de diseño creacional que nos permite construir objetos complejos
 * paso a paso.
 *
 * El patrón nos permite producir distintos tipos y representaciones
 * de un objeto empleando el mismo código de construcción.
 *
 * * Es útil cuando necesitamos construir un objeto complejo con muchas partes
 * * y queremos que el proceso de construcción sea independiente de las partes
 * * que lo componen.
 */

import { COLORS } from "../helpers/colors.ts";

//! Tarea: crear un QueryBuilder para construir consultas SQL
/**
 * Debe de tener los siguientes métodos:
 * - constructor(table: string)
 * - select(fields: string[]): QueryBuilder -- si no se pasa ningún campo, se seleccionan todos con el (*)
 * - where(condition: string): QueryBuilder - opcional
 * - orderBy(field: string, order: string): QueryBuilder - opcional
 * - limit(limit: number): QueryBuilder - opcional
 * - execute(): string - retorna la consulta SQL
 * 
 ** Ejemplo de uso:
  const usersQuery = new QueryBuilder("users") // users es el nombre de la tabla
    .select("id", "name", "email")
    .where("age > 18")
    .where("country = 'Cri'")
    .orderBy("name", "ASC")
    .limit(10)
    .execute();

  console.log('Consulta: ', usersQuery);
  // Select id, name, email from users where age > 18 and country = 'Cri' order by name ASC limit 10;
 */

//! Solución

class QueryBuilder {
  private table: string;
  private fields: string[] = [];
  private conditions: string[] = [];
  private orderFields: string[] = [];
  private limitCount?: number;

  constructor(table: string) {
    this.table = table;
  }

  select(...fields: string[]): QueryBuilder {
    this.fields = fields;
    return this;
  }

  where(condition: string): QueryBuilder {
    this.conditions.push(condition);
    return this;
  }

  orderBy(field: string, direction: "ASC" | "DESC" = "ASC"): QueryBuilder {
    this.orderFields.push(`${field} ${direction}`);
    return this;
  }

  limit(count: number): QueryBuilder {
    this.limitCount = count;
    return this;
  }

  execute(): string {
    // Select id, name, email from users where age > 18 and country = 'Cri' order by name ASC limit 10;
    let query = `Select ${
      this.fields.length ? this.fields.join(", ") : "*"
    } from ${this.table}`;
    if (this.conditions.length) {
      query += ` where ${this.conditions.join(" and ")}`;
    }
    if (this.orderFields.length) {
      query += ` order by ${this.orderFields.join(", ")}`;
    }
    if (this.limitCount) {
      query += ` limit ${this.limitCount}`;
    }
    return query;
  }
}

class HTMLTemplate {
  header: string;
  body: string;
  footer: string;

  print(): string {
    return `${this.header ?? ""}${this.body ?? ""}${this.footer ?? ""}`;
  }
}

class HTMLTemplateBuilder {
  private template: HTMLTemplate = new HTMLTemplate();

  setHeader(header: string): HTMLTemplateBuilder {
    this.template.header = header;
    return this;
  }

  setBody(body: string): HTMLTemplateBuilder {
    this.template.body = body;
    return this;
  }

  setFooter(footer: string): HTMLTemplateBuilder {
    this.template.footer = footer;
    return this;
  }

  build(): HTMLTemplate {
    return this.template;
  }
}

function main() {
  const usersQuery = new QueryBuilder("users")
    .select("id", "name", "email")
    .where("age > 18")
    .where("country = 'Cri'") // Esto debe de hacer una condición AND
    .orderBy("name", "ASC")
    .limit(10)
    .execute();

  console.log("%cConsulta:\n", COLORS.red);
  console.log(usersQuery);

  const econsentTemplate = new HTMLTemplateBuilder()
    .setHeader("<header>Welcome to the eConsent application</header>\n")
    .setBody("  <body>Body</body>\n")
    .setFooter("<footer>Footer</footer>")
    .build();
  console.log("%cTemplate:\n", COLORS.blue);
  console.log(econsentTemplate.print());

  const surveysTemplate = new HTMLTemplateBuilder()
    .setHeader("<header>Welcome to the surveys application</header>\n")
    .setFooter("<footer>Footer</footer>")
    .build();
  console.log("%cTemplate:\n", COLORS.green);
  console.log(surveysTemplate.print());
}

main();
