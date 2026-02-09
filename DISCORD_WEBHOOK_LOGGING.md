# Discord Webhook Logging Documentation

This document describes the Discord webhook logging implementation for the Astral Cheats admin panel.

## Overview

All admin panel actions are now automatically logged to a Discord webhook for monitoring and audit purposes. Each action sends a formatted embed message with relevant details.

## Webhook URL

The webhook is configured in `js/admin.js`:
```javascript
const DISCORD_WEBHOOK_URL = 'https://discord.com/api/webhooks/1470525672756871414/wR6Upu2fD0rs1fjrg1OI0p_EaGyZAgX6U4glkyJwnAtzYrLxd7iziW5x-HCe-ODsNGfF';
```

## Events Logged

### Authentication Events

#### 1. Successful Login
- **Title**: ✅ Admin Login Successful
- **Color**: Green (0x00FF00)
- **Fields**:
  - Time: Login timestamp
  - Status: Success

#### 2. Failed Login Attempt
- **Title**: ❌ Failed Login Attempt
- **Color**: Red (0xFF0000)
- **Fields**:
  - Time: Attempt timestamp
  - Attempted Password: The password that was tried

#### 3. Logout
- **Title**: 🚪 Admin Logout
- **Color**: Orange (0xFFA500)
- **Fields**:
  - Time: Logout timestamp
  - Action: Logout

### Product Management Events

#### 4. New Product Created
- **Title**: ➕ New Product Created
- **Color**: Green (0x00FF00)
- **Fields**:
  - Product Name
  - Price
  - Status (with icon)
  - Features Count
  - Time

#### 5. Product Updated
- **Title**: ✏️ Product Updated
- **Color**: Orange (0xFFA500)
- **Fields**:
  - Product Name
  - Price
  - Status (with icon)
  - Time

#### 6. Product Deleted
- **Title**: 🗑️ Product Deleted
- **Color**: Red (0xFF0000)
- **Fields**:
  - Product Name
  - Product ID
  - Time

#### 7. Product Status Changed
- **Title**: 🔄 Product Status Updated
- **Color**: Blue (0x3B82F6)
- **Fields**:
  - Product Name
  - Old Status (with icon)
  - New Status (with icon)
  - Time

### Category Management Events

#### 8. New Category Created
- **Title**: ➕ New Category Created
- **Color**: Green (0x00FF00)
- **Fields**:
  - Category Name
  - Description
  - Time

#### 9. Category Updated
- **Title**: ✏️ Category Updated
- **Color**: Orange (0xFFA500)
- **Fields**:
  - Category Name
  - Description
  - Time

#### 10. Category Deleted
- **Title**: 🗑️ Category Deleted
- **Color**: Red (0xFF0000)
- **Fields**:
  - Category Name
  - Category ID
  - Time

## Embed Format

Each webhook message includes:
- **Title**: Describes the action
- **Description**: Brief explanation of what happened
- **Color**: Visual indicator of action type (green=create, orange=update, red=delete, blue=status change)
- **Fields**: Specific details about the action
- **Timestamp**: Automatic timestamp when the event occurred
- **Footer**: "Astral Admin Panel" identifier

## Status Icons

The following icons are used to represent product statuses:
- ✓ - Working
- ⚠ - Caution
- 🔄 - Updating
- ✗ - Offline

## Implementation Details

### sendDiscordWebhook Function

The core function that sends webhook messages:

```javascript
async function sendDiscordWebhook(title, description, color = 0x5865F2, fields = []) {
    try {
        const embed = {
            title: title,
            description: description,
            color: color,
            fields: fields,
            timestamp: new Date().toISOString(),
            footer: {
                text: 'Astral Admin Panel'
            }
        };

        await fetch(DISCORD_WEBHOOK_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                embeds: [embed]
            })
        });
    } catch (error) {
        console.error('Failed to send Discord webhook:', error);
    }
}
```

### Error Handling

- Errors are caught and logged to console
- Failed webhook calls do not interrupt admin panel functionality
- Network issues are handled gracefully

## Testing

The implementation has been tested for:
- ✅ Successful login logging
- ✅ Failed login attempt logging
- ✅ Logout logging
- ✅ Product creation logging
- ✅ Product update logging
- ✅ Product deletion logging
- ✅ Product status change logging
- ✅ Category creation logging
- ✅ Category update logging
- ✅ Category deletion logging

## Security Considerations

1. **Sensitive Data**: Failed login attempts include the attempted password for security monitoring
2. **Webhook URL**: Keep the webhook URL secure and do not share publicly
3. **Rate Limiting**: Discord has rate limits on webhooks (30 requests per minute)
4. **Error Handling**: Failures are silently logged to avoid exposing webhook issues to attackers

## Future Enhancements

Potential improvements:
- Add IP address tracking for login attempts
- Include user agent information
- Add rate limiting to prevent spam
- Implement webhook retry logic
- Add configurable webhook URLs for different environments
- Include more detailed product change information (before/after comparison)
