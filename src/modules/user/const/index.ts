export const USER_CONSTANTS = {
  // Username constraints
  USERNAME_MIN_LENGTH: 3,
  USERNAME_MAX_LENGTH: 30,

  // Password constraints (for plain password before hashing)
  PASSWORD_MIN_LENGTH: 8,
  PASSWORD_MAX_LENGTH: 30,

  // Email constraints
  EMAIL_MAX_LENGTH: 255,

  // Bcrypt
  BCRYPT_SALT_ROUNDS: 10,
  BCRYPT_HASH_LENGTH: 60,

  /**
   * Regular expression to match a valid email address.
   *
   * @description
   * It can only contain letters, numbers, underscores, and hyphens.
   *
   * @example
   * 'john.doe@example.com'
   *
   * @type {RegExp}
   * @property {^} - Start of the string
   * @property {[^\s@]+} - Matches one or more characters that are not whitespace or @
   * @property {@} - Matches the @ symbol
   * @property {[^\s@]+} - Matches one or more characters that are not whitespace or @
   * @property {\.} - Matches the . symbol
   * @property {[^\s@]+} - Matches one or more characters that are not whitespace or @
   * @property {$} - End of the string
   */
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,

  /**
   * Regular expression to match a valid username.
   *
   * @description
   * It can only contain letters, numbers, underscores, and hyphens.
   *
   * @example
   * 'john_doe'
   *
   * @type {RegExp}
   * @property {^} - Start of the string
   * @property {[a-zA-Z0-9_-]+} - Matches one or more characters that are letters, numbers, underscores, and hyphens
   * @property {$} - End of the string
   */
  USERNAME_REGEX: /^[a-zA-Z0-9_-]+$/,
} as const;
