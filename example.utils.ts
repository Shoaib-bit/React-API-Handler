export interface GradingCriteriaItem {
  criteria_heads: CriteriaHead[]
}

export const getGradingCriteria = async (id: string | number): Promise<GradingCriteriaItem[]> => {
  if (!id) {
    throw new APIError('Course ID is required')
  }

  try {
    const response = await http.get<GradingCriteriaItem[]>(`/courses/gc/${id}/all`)
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw APIError.fromAxiosError(error, 'Failed to fetch grading criteria')
    }
    throw new APIError('An unexpected error occurred while fetching grading criteria')
  }
}
