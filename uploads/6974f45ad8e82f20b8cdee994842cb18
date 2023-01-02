File.open("Phenomenal Moment, one of the only in the later seasons _ #shorts #viral #gameof (2).mp4","r") do|file|
    chunk_size=4

    chunk_number=0

    file.each_slice(chunk_size) do |chunk|

        chunk_number =chunk_number+1

        File.open("large_file_chunk#{chunk_number}.mp4","w") do |output_file|

        output_file.write(chunk)
        end
    end
end
