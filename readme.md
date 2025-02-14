# API Handler

## Overview
This repository provides a standardized way to handle API calls in a TypeScript application using Axios. It includes a custom error-handling class and utility functions to manage API requests efficiently.

## Features
- **Custom API Error Handling**: Provides a structured way to handle API errors using an `APIError` class.
- **Axios Integration**: Utilizes Axios for making HTTP requests with proper error handling.
- **TypeScript Support**: Ensures type safety in API requests and responses.
- **Reusable Utility Functions**: Includes helper functions for making API calls in a consistent manner.

## Installation
To use this API handler in your project, install the necessary dependencies:

```sh
npm install axios
```

## API Error Handling
### API Error Class (`api.error.ts`)
The `APIError` class extends the native `Error` class to provide a structured format for API errors.

#### Example Implementation:
```ts
import { AxiosError } from 'axios'

interface ApiErrorResponse {
  message?: string
  [key: string]: any
}

export class APIError extends Error {
  public statusCode?: number
  public data?: any

  constructor(message: string, statusCode?: number, data?: any) {
    super(message)
    this.name = 'APIError'
    this.statusCode = statusCode
    this.data = data
  }

  static fromAxiosError(error: AxiosError<ApiErrorResponse>, defaultMessage: string): APIError {
    const statusCode = error.response?.status
    const message = error.response?.data?.message || defaultMessage
    const data = error.response?.data

    return new APIError(message, statusCode, data)
  }
}
```

## API Utility Example
### Fetch Grading Criteria (`utils.ts`)
This function fetches grading criteria from the API while handling errors properly.

#### Example Usage:
```ts
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
```

## Best Practices
- Always use `APIError` for handling errors.
- Ensure API calls have proper type safety.
- Use `try-catch` blocks to manage API failures gracefully.
- Provide meaningful error messages for better debugging.

## Contributing
Contributions are welcome! Feel free to open an issue or submit a pull request.
