export function projectMapper(rows) {
  return rows.map((row) => {
    return {
      id: row.id,
      name: row.name,
      startDate: row.start_date.toISOString().slice(0, 10),
      endDate: row.end_date.toISOString().slice(0, 10),
      description: row.description,
      technology: row.technology,
      imageUrl: row.image_url,
    };
  });
}

export function singleProjectMapper(row) {
  if (!row) {
    return;
  }

  return {
    id: row.id,
    name: row.name,
    startDate: row.start_date.toISOString().slice(0, 10),
    endDate: row.end_date.toISOString().slice(0, 10),
    description: row.description,
    technology: row.technology,
    imageUrl: row.image_url,
  };
}
