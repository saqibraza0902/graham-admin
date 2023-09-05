import api from "@/instance/api"

export const get_all_pending_payout_requests_api = async ({ query = '' }: { query?: string }) => {
    return api.get(`/admin/payout/all-requests${query}`)
}

export const confirm_payout_request_api = async (payout_id: string) => {
    return api.post(`/admin/payout/accept-payout`, {
        payout_id
    })
}

export const get_payout_history_api = async (searchQuery = "") => {
    return api.get(`/admin/payout/history${searchQuery}`)
}

export const reject_payout_request_api = async (payout_id: string) => {
    return api.post(`/admin/payout/reject-payout`, {
        payout_id
    })
}