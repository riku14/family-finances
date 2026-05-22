import { toast } from "sonner"
import { getErrorMessage } from "./apiError"

export const apiUtils = async <T>(
    fn: () => Promise<T>,
    successMessage: string,
    onSuccess?: () => void
): Promise<T> => {
    try {
        const result = await fn()
        onSuccess?.()
        toast.success(successMessage)
        return result
    } catch (e) {
        toast.error(getErrorMessage(e))
        throw e
    }
}