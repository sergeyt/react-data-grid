import { useMemo } from 'react';
import { wrapRefs } from '../utils';
export function useCombinedRefs(...refs) {
    return useMemo(() => wrapRefs(...refs), 
    // eslint-disable-next-line react-hooks/exhaustive-deps
    refs);
}
//# sourceMappingURL=useCombinedRefs.js.map