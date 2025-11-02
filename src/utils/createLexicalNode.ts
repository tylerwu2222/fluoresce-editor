/**
 * Utility functions for creating Lexical node classes with reduced boilerplate
 */

/**
 * Creates payload from node instance
 * Includes all fields (even undefined for optional ones)
 */
export function createPayloadFromNode<T extends Record<string, any>>(
  node: any,
  payloadKeys: readonly (keyof T)[]
): Partial<T> {
  const payload: Partial<T> = {};
  for (const key of payloadKeys) {
    const nodeKey = `__${String(key)}` as keyof typeof node;
    const value = node[nodeKey];
    // Include value even if undefined (for optional fields)
    payload[key] = value;
  }
  return payload;
}

/**
 * Assigns payload to node instance
 * Only assigns defined values (respects optional fields)
 * Applies defaults for undefined optional fields
 */
export function assignPayloadToNode<T extends Record<string, any>>(
  node: any,
  payload: Partial<T>,
  defaults?: Partial<T>
): void {
  // First assign all payload fields
  for (const key of Object.keys(payload) as (keyof T)[]) {
    const nodeKey = `__${String(key)}` as keyof typeof node;
    const value = payload[key];
    if (value !== undefined) {
      node[nodeKey] = value;
    }
  }
  
  // Then ensure required fields from defaults are set
  if (defaults) {
    for (const key of Object.keys(defaults) as (keyof T)[]) {
      const nodeKey = `__${String(key)}` as keyof typeof node;
      if (node[nodeKey] === undefined && defaults[key] !== undefined) {
        node[nodeKey] = defaults[key];
      }
    }
  }
}

/**
 * Creates serialized payload (for exportJSON)
 * Only includes defined fields for optional values
 */
export function createSerializedPayload<T extends Record<string, any>>(
  payload: Partial<T>,
  type: string,
  version: number
): T & { type: string; version: number } {
  // Filter out undefined optional fields
  const serialized = Object.fromEntries(
    Object.entries(payload).filter(([_, value]) => value !== undefined)
  ) as T;
  
  return {
    ...serialized,
    type,
    version,
  };
}

/**
 * Complete helper factory for a Lexical node
 */
export function createLexicalNodeHelpers<T extends Record<string, any>>(
  type: string,
  version: number,
  payloadKeys: readonly (keyof T)[]
) {
  return {
    /**
     * Creates payload from node (for clone)
     */
    createPayload: (node: any): Partial<T> => 
      createPayloadFromNode<T>(node, payloadKeys),
    
    /**
     * Assigns payload to node (for constructor)
     * Only assigns defined values, respects optional fields
     */
    assignPayload: (node: any, payload: Partial<T>, defaults?: Partial<T>): void => {
      assignPayloadToNode(node, payload, defaults);
    },
    
    /**
     * Creates serialized payload (for exportJSON)
     */
    createSerialized: (node: any): T & { type: string; version: number } => {
      const payload = createPayloadFromNode<T>(node, payloadKeys);
      return createSerializedPayload(payload, type, version);
    },
  };
}

