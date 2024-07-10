// Incrementing base64 counter
let counter = 0
const counterChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"

export default function getUniqueId(): string {
  // Get the current time in milliseconds
  const timestamp = Date.now()

  // Generate a cryptographically secure random value
  const randomBytes = crypto.getRandomValues(new Uint8Array(8))

  // Increment and get the next base64 counter value
  const counterValue = counterChars[counter % 64]
  counter = (counter + 1) % 64

  // Convert the timestamp, random bytes, and counter value to a base64 string
  const base64String =
    Array.from(randomBytes)
      .map((byte) => counterChars[byte % 64])
      .join("") +
    counterValue +
    btoa(
      String.fromCharCode(
        ...new Uint8Array([
          (timestamp & 0xff000000) >>> 24,
          (timestamp & 0x00ff0000) >>> 16,
          (timestamp & 0x0000ff00) >>> 8,
          timestamp & 0x000000ff,
        ]),
      ),
    ).slice(0, 8)

  // Ensure the string is 32 characters long
  return base64String.slice(0, 32)
}
