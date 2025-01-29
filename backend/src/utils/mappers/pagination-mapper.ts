export function paginationResponseMapper(data: any, total: number, page: number, limit: number): any {
  return {
    //current_page: page,
    current_page: parseInt(String(page)),
    data,
    per_page: limit,
    total,
    last_page: Math.ceil(total / limit),
  }
}