import { useEffect } from "react"
import { t } from "@/components/Translations"

export function useTitle(title: string | undefined, params?: string) {
    useEffect(() => {
        const prevTitle = document.title
        document.title = t(title ?? '') + (params || '')
        return () => {
            document.title = prevTitle
        }
    })
}
