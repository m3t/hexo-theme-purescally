#!/usr/bin/python3.5

# Copyright (C) 2015
# m3t (96bd6c8bb869fe632b3650fb7156c797ef8c2a055d31dde634565f3edda485b) <mlt [at] posteo [dot] de>

# The MIT License (MIT)

# Note on Bash et al.:
# http://wiki.bash-hackers.org/syntax/arrays
# Multidimensional arrays are not implemented


import os, itertools
# https://docs.python.org/3/library/os.html#os.scandir
# https://docs.python.org/3/library/itertools.html#itertools.combinations


# http://stackoverflow.com/a/11533053
def cat(outfilename, *infilenames):
    with open(outfilename, 'a') as outfile:
        for infilename in infilenames:
            with open(infilename) as infile:
                for line in infile:
                    if line.strip():
                        outfile.write(line)


path = os.path.dirname(os.path.realpath("__file__"))
files = []
for entry in os.scandir(path):
   if entry.name.endswith('.js') and entry.is_file():
       files.append(entry.name[:-3])

files.sort()
combinations = []
for i in range(2, len(files)+1):
    combinations = combinations + list(itertools.combinations(files, i))

for combination in combinations:
    combination_file = 'polyfills-'+'-'.join(map(str, combination))+'.js'
    for file in combination:
        cat(combination_file, file+'.js')
