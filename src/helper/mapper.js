export function projectMapper(rows) {
  return rows.map((row) => {
    return {
      id: row.id,
      name: row.name,
      startDate: row.start_date,
      endDate: row.end_date,
      description: row.description,
      technology: JSON.parse(row.technology),
      imageUrl: row.imageUrl,
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
    startDate: row.start_date,
    endDate: row.end_date,
    description: row.description,
    technology: JSON.parse(row.technology),
    imageUrl: row.imageUrl,
  };
}
