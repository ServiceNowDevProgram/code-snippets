# Send event.json to the instance defined in config.txt
$text = Get-Content config.txt
# The config.txt file should have the username, password and instance fqdn on separate lines. See config.txt.sample

# Specify endpoint username
$user = $text[0]

# Specify endpoint password
$pass = $text[1]

# Specify endpoint uri - REST Protocol
$uri = "https://" + $text[2] + "/api/now/table/em_event"

# Build auth header
$base64AuthInfo = [Convert]::ToBase64String([Text.Encoding]::ASCII.GetBytes(("{0}:{1}" -f $user, $pass)))

# Set proper headers
$headers = New-Object "System.Collections.Generic.Dictionary[[String],[String]]"
$headers.Add('Authorization', ('Basic {0}' -f $base64AuthInfo))


# Specify HTTP method
$method = "post"

# Import event
$body = Get-Content event.json

# Send HTTP request
[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12
$response = Invoke-WebRequest -ContentType 'application/json' -Headers $headers -Method $method -Uri $uri -Body $body

# Output to console (for troubleshooting)
# $response.RawContent
Write-Output "Sent this event to $uri"
Write-Output $body
