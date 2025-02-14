 try {
  const gradeCriteria = await getGradingCriteria(String(id))
} catch (err) {
  if (err instanceof APIError) {
    toast.error(err.message)
  } else {
    toast.error('An error occurred while fetching grading criteria.')
  }
}
