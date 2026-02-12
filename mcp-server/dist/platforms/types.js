/** Resource URI scheme: config://{platform}/{category}/{id} */
export const CONFIG_SCHEME = "config";
export function configUri(platform, category, id) {
    return `${CONFIG_SCHEME}://${platform}/${category}/${encodeURIComponent(id)}`;
}
//# sourceMappingURL=types.js.map