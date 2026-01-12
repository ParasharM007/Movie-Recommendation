export interface ApiResponseInterface<T> {
  success: boolean;
  message: string;
  data?: T;
  status:number
}

export function apiResponse<T>(
  success:boolean,
  message: string,
  status: number,
  data?: T,
): Response {
  return Response.json(
    {
      success,
      message,
      data,
    },
    { status }
  );
}
