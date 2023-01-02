# Initialize a counter for the chunk number
chunk_number = 0

# Initialize an empty string to hold the contents of the split files
contents = ""

# Loop until there are no more split files
while true
  # Increment the chunk number
  chunk_number += 1
  # Construct the filename for the current chunk
  chunk_filename = "large_file_chunk#{chunk_number}.mp4"
  # Break out of the loop if the chunk file doesn't exist
  break unless File.exist?(chunk_filename)
  # Read the contents of the chunk file
  chunk_contents = File.read(chunk_filename)
  # Append the contents of the chunk file to the overall contents
  contents << chunk_contents
end

# Write the combined contents to a new file
File.open("new.mp4", "w") do |file|
  file.write(contents)
end
